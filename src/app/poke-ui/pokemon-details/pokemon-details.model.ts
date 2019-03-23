export interface PokemonDetails {
  id: string;
  name: string;
  src: string;
  stats: Stat[];
}

interface Stat {
  baseStat: string;
  effort: string;
  name: string;
}
