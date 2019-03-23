import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails } from '../pokemon-details/pokemon-details.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsApiService {
  constructor(private httpClient: HttpClient) {}

  getPokemon(id: string): Observable<PokemonDetails> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.httpClient
      .get<PokemonResponse>(url)
      .pipe(map(response => this.mapToViewPokemonDetails(response)));
  }

  private mapToViewPokemonDetails({ id, name, stats, sprites }: PokemonResponse): PokemonDetails {
    return {
      name,
      id: String(id),
      src: sprites.front_default,
      stats: stats.map(({ base_stat, effort, stat }) => ({
        effort: String(effort),
        baseStat: String(base_stat),
        name: stat.name,
      })),
    };
  }
}

interface PokemonResponse {
  id: number;
  name: string;
  stats: Stat[];
  sprites: Sprites;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: MetaStat;
}

interface MetaStat {
  name: string;
  url: string;
}

interface Sprites {
  front_default: string;
}
