import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails } from './pokemon-details.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsService {
  pokemonDetails$: Subject<PokemonDetails> = new Subject();

  constructor(private httpClient: HttpClient) {}

  fetchPokemonDetails(id: string): void {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    this.httpClient
      .get<PokemonResponse>(url)
      .pipe(
        map(response => mapToViewPokemonDetails(response)),
        tap(pokemonDetails => this.pokemonDetails$.next(pokemonDetails)),
      )
      .subscribe();
  }
}

function mapToViewPokemonDetails({ name, stats, sprites }: PokemonResponse): PokemonDetails {
  return {
    name,
    src: sprites.front_default,
    stats: stats.map(({ base_stat, effort, stat }) => ({
      effort: String(effort),
      baseStat: String(base_stat),
      name: stat.name,
    })),
  };
}

interface PokemonResponse {
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
