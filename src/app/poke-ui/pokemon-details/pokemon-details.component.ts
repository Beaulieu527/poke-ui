import { Component, OnInit } from '@angular/core';
import { PokemonDetailsService } from './pokemon-details.service';
import { PokemonDetails } from './pokemon-details.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetails$: Observable<PokemonDetails> = this.pokemonDetailsService.pokemonDetails$;

  constructor(
    private route: ActivatedRoute,
    private pokemonDetailsService: PokemonDetailsService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.pokemonDetailsService.fetchPokemonDetails(params.id),
    );
  }
}
