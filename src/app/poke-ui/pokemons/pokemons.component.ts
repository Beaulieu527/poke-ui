import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokemonsService } from './pokemons.service';
import { Pokemon, PokemonsQueryParams } from './pokemon.model';
import { pad } from '../utils';

const POKEMON_COUNT = 807;
const INITIAL_POKEMONS_QUERY_PARAMS: PokemonsQueryParams = {
  offset: 0,
  limit: 10,
};

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  form: FormGroup;
  loading = true;
  paginationMaxPage = 10;
  pokemonsQueryParams: PokemonsQueryParams = INITIAL_POKEMONS_QUERY_PARAMS;
  pokemons$: Observable<Pokemon[]> = this.pokemonsService.pokemons$.pipe(
    tap(() => (this.loading = false)),
  );

  private pokemonCount = POKEMON_COUNT;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pokemonsService: PokemonsService,
  ) {}

  ngOnInit(): void {
    this.setQueryParamsState();
    this.pokemonsService.fetchPokemons(this.pokemonsQueryParams);
    this.form = this.formBuilder.group({
      search: [null, [Validators.required, Validators.max(this.pokemonCount), Validators.min(1)]],
    });
  }

  onPageChange(pokemonsQueryParams: PokemonsQueryParams): void {
    this.loading = true;
    this.pokemonsQueryParams = pokemonsQueryParams;
    this.pokemonsService.fetchPokemons(pokemonsQueryParams);
  }

  getPadId(id: string): string {
    return `#${pad(id, 3)}`;
  }

  private setQueryParamsState(): void {
    const limit = this.route.snapshot.queryParamMap.get('limit');
    const offset = this.route.snapshot.queryParamMap.get('offset');
    this.pokemonsQueryParams = {
      limit: limit ? Number(limit) : this.pokemonsQueryParams.limit,
      offset: offset ? Number(offset) : this.pokemonsQueryParams.offset,
    };
    this.actualizeRouterQueryParams();
  }

  private actualizeRouterQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.pokemonsQueryParams,
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }
}
