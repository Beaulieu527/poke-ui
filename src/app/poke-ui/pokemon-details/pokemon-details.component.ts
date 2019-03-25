import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokemonDetailsService } from './pokemon-details.service';
import { PokemonDetails } from './pokemon-details.model';
import { Title } from '@angular/platform-browser';

const POKEMON_COUNT = 807;

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  loading = true;
  pokemonDetails$: Observable<PokemonDetails> = this.pokemonDetailsService.pokemonDetails$.pipe(
    tap(() => (this.loading = false)),
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

  onPreviousClick(id: string) {
    this.loading = true;
    const previousId = this.pokemonFirstNumber < Number(id) ? Number(id) - 1 : this.pokemonCount;
    this.actualizeQueryParams(String(previousId));
    this.pokemonDetailsService.fetchPokemonDetails(String(previousId));
  }

  onNextClick(id: string) {
    this.loading = true;
    const nextId = this.pokemonCount > Number(id) ? Number(id) + 1 : this.pokemonFirstNumber;
    this.actualizeQueryParams(String(nextId));
    this.pokemonDetailsService.fetchPokemonDetails(String(nextId));
  }

  private actualizeQueryParams(id: string) {
    this.location.replaceState(`details/${id}`);
  }
}
function capitalize(value: string): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}
