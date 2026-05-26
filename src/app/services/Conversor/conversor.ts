import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { divisas, conversion } from '../../models/Conversor/conversor';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {
  private url = '/api-divisas';

  constructor(private http: HttpClient) { }

  // 1. Obtener listado de monedas
  obtenerMonedas(): Observable<any> {
    return this.http.get<any>(`${this.url}/currencies`);
  }

  // 2. Realizar la conversión
  convertirMoneda(from: string, to: string, amount: number): Observable<any> {
    return this.http.get<any>(`${this.url}/convert?from=${from}&to=${to}&amount=${amount}`);
  }
}