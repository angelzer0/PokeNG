import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails } from '../../models/pokemon.model';
import { typeColors } from '../utils/type-colors';

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
  @Input() minimal: boolean = false;
  @Output() select = new EventEmitter<string>();

  details?: PokemonDetails;
  loading = true;

  typeColors = typeColors;

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
