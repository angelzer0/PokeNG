import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../components/pokemon-card.component';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allPokemon: Pokemon[] = [];
  filteredList: Pokemon[] = [];
  searchTerm: string = '';

  limit: number = 20;
  currentPage: number = 1;
  loading = true;

  viewMode: 'grid' | 'list' = 'grid';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadAllPokemonNames();
  }

  loadAllPokemonNames() {
    this.loading = true;
    this.pokemonService.getPokemonList(0, 2000).subscribe((data) => {
      this.allPokemon = data.results;
      this.filteredList = data.results;
      this.loading = false;
    });
  }

  search() {
    this.currentPage = 1;
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredList =
      term === ''
        ? this.allPokemon
        : this.allPokemon.filter((p) => p.name.toLowerCase().includes(term));
  }

  get currentPageItems(): Pokemon[] {
    const start = (this.currentPage - 1) * this.limit;
    const end = this.currentPage * this.limit;
    return this.filteredList.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredList.length / this.limit);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  setView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }
}
