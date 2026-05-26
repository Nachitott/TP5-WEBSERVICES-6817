import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})


export class TtsServices {

  private url = '/api-tts';

  constructor(private http: HttpClient) { };

  generarAudio(texto: string, idioma: string): Observable<Blob> {


    const headers = new HttpHeaders()
      .set('x-rapidapi-key', '32a47549f7msh3702c15b4b278ccp1aff38jsn957a8427ffca') // Tu clave de autenticación.
      .set('x-rapidapi-host', 'open-ai-text-to-speech1.p.rapidapi.com') // El host del servidor de la API.
      .set('Content-Type', 'application/json');


    const body = {
      model: 'tts-1',              // El modelo obligatorio que figuraba en la captura
      voice: 'alloy',              // La voz que pide por defecto
      input: texto,                // ¡CLAVE! La API espera 'input', no 'text'
      instructions: `Speak in a lively and optimistic tone in language code: ${idioma}`
    };

    return this.http.post(`${this.url}/`, body, { headers: headers, responseType: 'blob' });
  }

}
