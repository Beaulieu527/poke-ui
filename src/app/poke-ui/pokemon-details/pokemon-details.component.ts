import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { PokemonDetailsService } from './pokemon-details.service';
import { PokemonDetails, Stat } from './pokemon-details.model';
import { capitalize, pad } from '../utils';

const POKEMON_COUNT = 807;

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  loading = true;
  chartLabels: Label[];
  chartDataSets: ChartDataSets[];
  pokemonDetails$: Observable<PokemonDetails> = this.pokemonDetailsService.pokemonDetails$.pipe(
    tap(() => (this.loading = false)),
    tap(({ stats }) => (this.chartDataSets = mapToChartDataSets(stats))),
    tap(({ stats }) => (this.chartLabels = mapToChartLabels(stats))),
    tap(({ name }) => this.title.setTitle(capitalize(name))),
  );

  private pokemonCount = POKEMON_COUNT;
  private pokemonFirstNumber = 1;

  constructor(
    private title: Title,
    private location: Location,
    private route: ActivatedRoute,
    private pokemonDetailsService: PokemonDetailsService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.pokemonDetailsService.fetchPokemonDetails(params.id),
    );
  }

  onPreviousClick(id: string): void {
    this.loading = true;
    const previousId = this.pokemonFirstNumber < Number(id) ? Number(id) - 1 : this.pokemonCount;
    this.actualizeQueryParams(String(previousId));
    this.pokemonDetailsService.fetchPokemonDetails(String(previousId));
  }

  onNextClick(id: string): void {
    this.loading = true;
    const nextId = this.pokemonCount > Number(id) ? Number(id) + 1 : this.pokemonFirstNumber;
    this.actualizeQueryParams(String(nextId));
    this.pokemonDetailsService.fetchPokemonDetails(String(nextId));
  }

  getPadId(id: string): string {
    return `#${pad(id, 3)}`;
  }

  getCapitalize(value: string): string {
    return capitalize(value);
  }

  private actualizeQueryParams(id: string): void {
    this.location.replaceState(`details/${id}`);
  }
}

function mapToChartDataSets(stats: Stat[]): ChartDataSets[] {
  return [
    {
      data: stats.map(({ baseStat }) => Number(baseStat)),
    },
  ];
}

function mapToChartLabels(stats: Stat[]): Label[] {
  return stats.map(({ name }) => name);
}
