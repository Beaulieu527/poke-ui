import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokemonDetails } from './pokemon-details.model';
import { PokemonDetailsApiService } from '../services/pokemon-details-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsService {
  pokemonDetails$: Subject<PokemonDetails> = new Subject();

  constructor(private pokemonDetailsApiService: PokemonDetailsApiService) {}

  fetchPokemonDetails(id: string): void {
    this.pokemonDetailsApiService
      .getPokemon(id)
      .pipe(tap(pokemonDetails => this.pokemonDetails$.next(pokemonDetails)))
      .subscribe();
  }
}
