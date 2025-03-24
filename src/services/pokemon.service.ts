// src/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PokemonListResponse,
  PokemonDetails,
  SpeciesDetails
} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number, limit: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${name}`);
  }

  getPokemonSpecies(name: string): Observable<SpeciesDetails> {
    return this.http.get<SpeciesDetails>(`${this.baseUrl}/pokemon-species/${name}`);
  }
}
