import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { MarcaAuto, ModeloAuto } from '../../models/CardMaker/card-maker';

@Injectable({
  providedIn: 'root',
})


export class CardMakerService {
  private url = '/api-marcas';

  private marcasCacheadas: MarcaAuto[] = [];
  private modelosCacheados: ModeloAuto[] = [];

  constructor(private http: HttpClient) { };

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('x-rapidapi-key', '32a47549f7msh3702c15b4b278ccp1aff38jsn957a8427ffca')
      .set('x-rapidapi-host', 'car-specs.p.rapidapi.com');
  }

  getMarca(): Observable<any> {
    if (this.marcasCacheadas.length > 0) {
      return of(this.marcasCacheadas);
    }

    return this.http.get(`${this.url}/v2/cars/makes`, { headers: this.getHeaders() }).pipe(
      tap((resultado: any) => {
        this.marcasCacheadas = resultado;
      })
    );
  }

  getModelosPorMarca(makeID: string): Observable<any> {
    return this.http.get(`${this.url}/v2/cars/makes/${makeID}/models`, { headers: this.getHeaders() });
  }

  /*  getMarca(): Observable<any> {
      if (this.marcasCacheadas.length > 0) {
        return of(this.marcasCacheadas);
      }
  
      const headers = new HttpHeaders()
        .set('x-rapidapi-key', '32a47549f7msh3702c15b4b278ccp1aff38jsn957a8427ffca')
        .set('x-rapidapi-host', 'car-specs.p.rapidapi.com/v2/cars/makes')
  
      return this.http.get(this.url, { headers }).pipe(
        tap((resultado: any) => {
          this.marcasCacheadas = resultado;
        })
      );
    }
  
  
    getModelosPorMarca(MakeId: string): Observable<any> {
      if (this.modelosCacheados.length > 0) {
        return of(this.modelosCacheados);
      }
  
      const headers = new HttpHeaders()
        .set('x-rapidapi-key', '32a47549f7msh3702c15b4b278ccp1aff38jsn957a8427ffca')
        .set('x-rapidapi-host', 'car-specs.p.rapidapi.com/v2/cars/makes/${MakeId}/models');
  
      return this.http.get(this.url, { headers }).pipe(
        tap((resultado: any) => {
          this.modelosCacheados = resultado;
        })
      );
  
    }
  
  }*/
}