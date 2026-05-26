import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConversorService } from '../../../services/Conversor/conversor';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-conversor',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './conversor.html',
  styleUrl: './conversor.css',
})


export class ConversorComponent implements OnInit {
  cantidad: number = 0;
  monedaOrigen: string = "USD";
  monedaDestino: string = "ARS";


  listaMonedas: { codigo: string, nombre: string }[] = [];

  resultadoFinal: number | null = null;
  cargando: boolean = false;

  constructor(
    private conversorService: ConversorService,
    private cdr: ChangeDetectorRef
  ) { };

  ngOnInit(): void {
    this.cargarListadoMonedas();
  }

  cargarListadoMonedas(): void {
    this.conversorService.obtenerMonedas().subscribe({
      next: (data) => {
        // Esta API devuelve un array directo o un objeto con las monedas limpias
        this.listaMonedas = Object.keys(data).map(key => ({
          codigo: key,
          nombre: `${key} - ${data[key].name || data[key]}`
        })).sort((a, b) => a.codigo.localeCompare(b.codigo));

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al traer monedas:', err)
    });
  }

  ejecutarConversion(): void {
    if (this.cantidad <= 0) return;

    this.cargando = true;
    this.resultadoFinal = null;

    this.conversorService.convertirMoneda(this.monedaOrigen, this.monedaDestino, this.cantidad).subscribe({
      next: (data) => {
        if (data.success) {
          this.resultadoFinal = data.result; // Extraemos el valor numérico final del JSON
        }
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al realizar la conversión:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
