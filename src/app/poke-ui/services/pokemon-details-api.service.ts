import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        name: STAT_NAME_MAP.get(stat.name),
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
  name: NameType;
  url: string;
}

enum NameType {
  Speed = 'speed',
  SpecialDefense = 'special-defense',
  SpecialAttack = 'special-attack',
  Defense = 'defense',
  Attack = 'attack',
  Hp = 'hp',
}

interface Sprites {
  front_default: string;
}

const STAT_NAME_MAP: Map<NameType, string> = new Map([
  [NameType.Speed, 'Speed'],
  [NameType.SpecialDefense, 'Special Defense'],
  [NameType.SpecialAttack, 'Special Attack'],
  [NameType.Defense, 'Defense'],
  [NameType.Attack, 'Attack'],
  [NameType.Hp, 'Hp'],
]);
