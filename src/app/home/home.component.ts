import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../components/pokemon-card.component';
import { Pokemon } from '../../models/pokemon.model';
import { FormsModule } from '@angular/forms';
import { PokemonDetailComponent } from '../components/pokemon-detail.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, FormsModule, PokemonDetailComponent ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredList: Pokemon[] = [];
  searchTerm: string = '';
  offset: number = 0;
  limit: number = 20;

  loading = true;
  selectedPokemon: string | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemon();
  }

  fetchPokemon() {
    this.loading = true;
    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe(data => {
      this.pokemonList = data.results;
      this.filteredList = data.results;
      this.loading = false;
    });
  }

  search() {
    this.filteredList = this.pokemonList.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  nextPage() {
    this.offset += this.limit;
    this.fetchPokemon();
  }

  prevPage() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.fetchPokemon();
    }
  }

  selectPokemon(name: string) {
    this.selectedPokemon = name;
  }
}
