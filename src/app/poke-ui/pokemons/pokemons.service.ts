import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pokemon } from './pokemon.model';
import { PokemonsApiService, QueryPokemons } from '../services/pokemons-api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  pokemons$: Subject<Pokemon[]> = new Subject();

  constructor(private pokemonApiService: PokemonsApiService) {}

  fetchPokemons(query: QueryPokemons): void {
    this.pokemonApiService
      .getPokemons(query)
      .pipe(tap(pokemons => this.pokemons$.next(pokemons)))
      .subscribe();
  }
}
