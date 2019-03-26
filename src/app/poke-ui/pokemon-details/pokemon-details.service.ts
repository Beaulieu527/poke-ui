import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PokemonDetails } from './pokemon-details.model';
import { PokemonDetailsApiService } from '../services/pokemon-details-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsService {
  pokemonDetails$: Subject<PokemonDetails> = new Subject();

  constructor(private router: Router, private pokemonDetailsApiService: PokemonDetailsApiService) {}

  fetchPokemonDetails(id: string): void {
    this.pokemonDetailsApiService
      .getPokemon(id)
      .pipe(
        tap(pokemonDetails => this.pokemonDetails$.next(pokemonDetails)),
        catchError(() => this.router.navigate(['./'])),
      )
      .subscribe();
  }
}
