import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokemonDetailsService } from './pokemon-details.service';
import { PokemonDetails } from './pokemon-details.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  loading = true;
  pokemonDetails$: Observable<PokemonDetails> = this.pokemonDetailsService.pokemonDetails$.pipe(
    tap(() => (this.loading = false)),
  );

  private maxCount = 900;
  private minCount = 1;

  constructor(
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
    const previousId = this.minCount < Number(id) ? Number(id) - 1 : this.maxCount;
    this.actualizeQueryParams(String(previousId));
    this.pokemonDetailsService.fetchPokemonDetails(String(previousId));
  }

  onNextClick(id: string) {
    this.loading = true;
    const nextId = this.maxCount > Number(id) ? Number(id) + 1 : this.minCount;
    this.actualizeQueryParams(String(nextId));
    this.pokemonDetailsService.fetchPokemonDetails(String(nextId));
  }

  private actualizeQueryParams(id: string) {
    this.location.replaceState(`details/${id}`);
  }
}
