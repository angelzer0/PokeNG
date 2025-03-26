import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from '../../models/pokemon.model';
import { RouterModule } from '@angular/router';
import { typeColors } from '../utils/type-colors';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemonName!: string;
  @Output() close = new EventEmitter<void>();

  details?: PokemonDetails;
  description = '';
  speciesGenus = '';
  loading = true;
  typeColors = typeColors;

  activeTab: 'about' | 'stats' = 'about';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Si no se pasa como @Input, lo sacamos de la URL
    if (!this.pokemonName) {
      const nameFromRoute = this.route.snapshot.paramMap.get('name');
      if (nameFromRoute) {
        this.pokemonName = nameFromRoute;
      }
    }

    this.fetchDetails();
  }

  fetchDetails() {
    if (!this.pokemonName) return;

    this.loading = true;

    this.http
      .get<PokemonDetails>(
        `https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`
      )
      .subscribe((data) => {
        this.details = data;
        this.fetchSpecies();
      });
  }

  fetchSpecies() {
    this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonName}`)
      .subscribe((data) => {
        const entry = data.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );
        this.description = entry
          ? entry.flavor_text.replace(/\f/g, ' ')
          : 'No description available.';

        const genusEntry = data.genera.find(
          (entry: any) => entry.language.name === 'en'
        );
        this.speciesGenus = genusEntry ? genusEntry.genus : '';

        this.loading = false;
      });
  }
}
