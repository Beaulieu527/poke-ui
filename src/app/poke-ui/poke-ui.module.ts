import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/pokemons.component';

const ROUTES: Routes = [
  {
    path: '',
    component: PokemonsComponent,
  },
];

@NgModule({
  declarations: [PokemonsComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class PokeUiModule {}
