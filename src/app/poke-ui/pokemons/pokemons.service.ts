import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private httpClient: HttpClient) {}

  getPokemons(query: QueryPokemons): Observable<Pokemon[]> {
    const url = `https://pokeapi.co/api/v2/pokemon/${parseToStringQuery(query)}`;
    return this.httpClient
      .get<PokemonsResponse>(url)
      .pipe(map(response => mapToViewPokemons(response.results)));
  }
}

function parseToStringQuery(query: QueryPokemons): string {
  return Object.keys(query).reduce((prev, key) => `${prev}${key}=${query[key]}&`, `?`);
}

function mapToViewPokemons(pokemons: Pokemon[]): Pokemon[] {
  return pokemons.map(({ name }) => ({ name }));
}

interface PokemonsResponse {
  results: Pokemon[];
}

interface QueryPokemons {
  offset: number;
  limit: number;
}
