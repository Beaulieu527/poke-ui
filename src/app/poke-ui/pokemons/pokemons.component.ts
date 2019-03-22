import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './pokemon.model';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
})
export class PokemonsComponent {
  pokemons$: Observable<Pokemon[]> = this.pokemonsService.getPokemons({ offset: 0, limit: 10 });

  constructor(private pokemonsService: PokemonsService) {}
}
