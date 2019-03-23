import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const ROUTES: Routes = [
  {
    path: '',
    component: PokemonsComponent,
  },
  {
    path: 'details/:id',
    component: PokemonDetailsComponent,
  },
];

@NgModule({
  declarations: [PokemonsComponent, PokemonDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class PokeUiModule {}
