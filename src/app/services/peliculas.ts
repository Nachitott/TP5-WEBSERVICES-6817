import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private proxyUrl = '/api-peliculas/';
  // 🚀 Creamos una variable interna para guardar las películas en memoria
  private peliculasCacheadas: any[] = [];

  constructor(private http: HttpClient) { }

  getPeliculas(): Observable<any> {
    // Si ya tenemos las películas guardadas, las devolvemos de inmediato sin ir a internet
    if (this.peliculasCacheadas.length > 0) {
      return of(this.peliculasCacheadas);
    }

    // Si es la primera vez, hacemos la petición real y guardamos el resultado usando 'tap'
    const headers = new HttpHeaders()
      .set('x-rapidapi-key', '32a47549f7msh3702c15b4b278ccp1aff38jsn957a8427ffca')
      .set('x-rapidapi-host', 'imdb-top-100-movies.p.rapidapi.com');

    return this.http.get(this.proxyUrl, { headers }).pipe(
      tap((resultado: any) => {
        this.peliculasCacheadas = resultado; // 👈 Guardamos en caché para la próxima navegación
      })
    );
  }
}