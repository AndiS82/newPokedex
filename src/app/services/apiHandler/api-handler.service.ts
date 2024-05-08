import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPokemon } from '../../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://pokeapi.co/api/v2/';

  getAll(): Observable<any> {
    return this.http.get<IPokemon>(
      `${this.baseUrl}pokemon/?limit=904&offset=0.`
    );
  }

  getPokemon(offset: number, offsetLimit: number): Observable<any> {
    return this.http.get<IPokemon>(
      `${this.baseUrl}/pokemon?offset=${offset}&limit=${offsetLimit}`
    );
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon/${id}`);
  }

  getPokemonTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}type/`);
  }

  getPokemonByType(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}type/${type}`);
  }

  getLang(): Observable<any> {
    return this.http.get(`${this.baseUrl}language/6`);
  }
}
