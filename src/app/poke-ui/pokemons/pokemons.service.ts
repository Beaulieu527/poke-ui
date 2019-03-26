import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokemonsApiService } from '../services/pokemons-api.service';
import { Pokemon, PokemonsQueryParams } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  pokemons$: Subject<Pokemon[]> = new Subject();

  constructor(private pokemonApiService: PokemonsApiService) {}

  fetchPokemons(pokemonsQueryParams: PokemonsQueryParams): void {
    this.pokemonApiService
      .getPokemons(pokemonsQueryParams)
      .pipe(tap(pokemons => this.pokemons$.next(pokemons)))
      .subscribe();
  }
}
