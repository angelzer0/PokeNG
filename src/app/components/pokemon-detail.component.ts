import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemonName!: string;
  @Output() close = new EventEmitter<void>();

  details?: PokemonDetails;
  description = '';
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDetails();
  }

  fetchDetails() {
    this.loading = true;

    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`).subscribe((data) => {
      this.details = data;
      this.fetchSpecies();
    });
  }

  fetchSpecies() {
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonName}`).subscribe((data) => {
      const entry = data.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
      this.description = entry ? entry.flavor_text.replace(/\f/g, ' ') : 'No description available.';
      this.loading = false;
    });
  }
}
