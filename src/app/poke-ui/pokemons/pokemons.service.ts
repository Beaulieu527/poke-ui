import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon.model';
import { PokemonsApiService, QueryPokemons } from '../services/pokemons-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private pokemonApiService: PokemonsApiService) {}

  getPokemons(query: QueryPokemons): Observable<Pokemon[]> {
    return this.pokemonApiService.getPokemons(query);
  }
}
