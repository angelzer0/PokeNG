// src/app/components/pokemon-card/pokemon-card.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() name!: string;
  @Input() url!: string;
  @Output() select = new EventEmitter<string>();

  details?: PokemonDetails;
  loading = true;

  typeColors: Record<string, string> = {
    normal:   "#a8a29e",
    fire:     "#f97316",
    water:    "#3b82f6",
    electric: "#facc15",
    grass:    "#22c55e",
    ice:      "#67e8f9",
    fighting: "#b91c1c",
    poison:   "#a855f7",
    ground:   "#d97706",
    flying:   "#a5b4fc",
    psychic:  "#ec4899",
    bug:      "#84cc16",
    rock:     "#a16207",
    ghost:    "#6b21a8",
    dragon:   "#4338ca",
    dark:     "#57534e",
    steel:    "#94a3b8",
    fairy:    "#f9a8d4",
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<PokemonDetails>(this.url).subscribe({
      next: (data) => {
        this.details = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(`Error fetching ${this.name}`, err);
        this.loading = false;
      }
    });
  }

  onClick(): void {
    this.select.emit(this.name);
  }
}
