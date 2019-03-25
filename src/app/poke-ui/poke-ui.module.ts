import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { InputComponent } from './components/input/input.component';
import { ArrowComponent } from './components/arrow/arrow.component';

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
  declarations: [
    PokemonsComponent,
    PokemonDetailsComponent,
    PaginationComponent,
    InputComponent,
    ArrowComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(ROUTES)],
})
export class PokeUiModule {}
