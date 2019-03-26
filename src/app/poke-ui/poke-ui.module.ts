import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { InputComponent } from './components/input/input.component';
import { ArrowComponent } from './components/arrow/arrow.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { PokeballSpinnerComponent } from './components/pokeball-spinner/pokeball-spinner.component';

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
    RadarChartComponent,
    PokeballSpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    ChartsModule,
    LazyLoadImageModule,
  ],
})
export class PokeUiModule {}
