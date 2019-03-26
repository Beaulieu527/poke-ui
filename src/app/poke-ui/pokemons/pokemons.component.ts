import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './pokemon.model';

const POKEMON_COUNT = 807;

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  form: FormGroup;
  offset = 0;
  limit = 10;
  loading = true;
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
    this.pokemonsService.fetchPokemons({ offset: this.offset, limit: this.limit });
    this.form = this.formBuilder.group({
      search: [null, [Validators.required, Validators.max(this.pokemonCount), Validators.min(1)]],
    });
  }

  onPageChange(pageNumber: number): void {
    this.loading = true;
    this.offset = this.limit * pageNumber;
    this.actualizeQueryParams();
    this.pokemonsService.fetchPokemons({ offset: this.offset, limit: this.limit });
  }

  private actualizeQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { limit: this.limit, offset: this.offset },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  private setQueryParamsState(): void {
    const limit = this.route.snapshot.queryParamMap.get('limit');
    const offset = this.route.snapshot.queryParamMap.get('offset');
    this.limit = limit ? Number(limit) : this.limit;
    this.offset = offset ? Number(offset) : this.offset;
    this.actualizeQueryParams();
  }
}
