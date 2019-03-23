export interface PokemonDetails {
  name: string;
  src: string;
  stats: Stat[];
}

interface Stat {
  baseStat: string;
  effort: string;
  name: string;
}
