import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TtsServices } from '../../../services/TTS/tts';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tts.html',
  styleUrl: './tts.css',
})


export class TTSComponent {

  textoUsuario: string = '';
  idiomaSeleccionado: string = 'es';
  // Declarás la variable al principio del componente como un string común
  audioUrl: string | null = null;
  cargando: boolean = false;


  constructor(
    private ttsService: TtsServices,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { };


  procesarTexto(): void {
    if (!this.textoUsuario || !this.textoUsuario.trim()) return;

    this.cargando = true;
    this.audioUrl = null;
    this.cdr.detectChanges();

    this.ttsService.generarAudio(this.textoUsuario.trim(), this.idiomaSeleccionado).subscribe({
      next: (blob: Blob) => {
        // APAGAMOS EL CARGANDO INMEDIATAMENTE
        // Al ponerlo acá arriba de todo, nos aseguramos de que el botón se destrabe SÍ O SÍ
        this.cargando = false;
        this.cdr.detectChanges();

        // Control por consola para ver qué nos está dando la API de verdad
        console.log('--- DATOS DEL BINARIO RECIBIDO ---');
        console.log('Tamaño en bytes:', blob.size);
        console.log('Tipo MIME original de la API:', blob.type);

        // Usamos un try/catch para que si el navegador se tilda al armar el audio, la app no muera
        try {
          if (blob.size === 0) {
            throw new Error('El archivo de audio llegó completamente vacío (0 bytes).');
          }

          // Forzamos el empaquetado
          const audioBlob = new Blob([blob], { type: 'audio/mpeg' });
          this.audioUrl = URL.createObjectURL(audioBlob);
          this.cdr.detectChanges();

          // Intentamos cargar el buffer de forma segura
          setTimeout(() => {
            const elementoAudio = document.querySelector('audio');
            if (elementoAudio) {
              elementoAudio.load();
            }
          }, 50);

        } catch (errorInterno) {
          console.error('Error crítico al procesar el archivo de audio en el navegador:', errorInterno);
          alert('La API devolvió los bytes correctamente pero el formato del archivo no es un audio válido.');
        }
      },
      error: (err) => {
        console.error('La petición HTTP falló en el servidor de RapidAPI:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
