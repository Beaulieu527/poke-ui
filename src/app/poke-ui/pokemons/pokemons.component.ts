import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './pokemon.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
})
export class PokemonsComponent implements OnInit {
  loading = true;
  pokemons$: Observable<Pokemon[]> = this.pokemonsService.pokemons$.pipe(
    tap(() => (this.loading = false)),
  );

  private offset = 0;
  private limit = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pokemonsService: PokemonsService,
  ) {}

  ngOnInit(): void {
    const limit = this.route.snapshot.queryParamMap.get('limit');
    const offset = this.route.snapshot.queryParamMap.get('offset');
    this.limit = limit ? Number(limit) : this.limit;
    this.offset = offset ? Number(offset) : this.offset;
    this.actualizeQueryParams();
    this.pokemonsService.fetchPokemons({ offset: this.offset, limit: this.limit });
  }

  nextPageClick(count: number): void {
    this.loading = true;
    this.offset = this.limit * count;
    this.actualizeQueryParams();
    this.pokemonsService.fetchPokemons({ offset: this.offset, limit: this.limit });
  }

  private actualizeQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { limit: this.limit, offset: this.offset },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }
}
