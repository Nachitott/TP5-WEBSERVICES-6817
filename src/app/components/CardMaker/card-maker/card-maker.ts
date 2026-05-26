import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CardMakerService } from '../../../services/CardMaker/card-maker';
import { MarcaAuto, ModeloAuto } from '../../../models/CardMaker/card-maker';

@Component({
  selector: 'app-card-maker',
  standalone: true,
  imports: [],
  templateUrl: './card-maker.html',
  styleUrl: './card-maker.css',
})
export class CardMakerComponent implements OnInit {
  listaMarcas: MarcaAuto[] = [];
  listaModelos: ModeloAuto[] = [];


  constructor(
    private cardMakerService: CardMakerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerListaMarcas();
  }

  obtenerListaMarcas(): void {
    this.cardMakerService.getMarca().subscribe({
      next: (resultado) => {
        this.listaMarcas = resultado;
        console.log('Datos asignados con exito', this.listaMarcas);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en el pasaje del proxy:', err);
      }
    });
  }

  obtenerModelosPorMarca(marcaID: string): void {
    this.cardMakerService.getModelosPorMarca(marcaID).subscribe({
      next: (resultado) => {
        this.listaModelos = resultado;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en el pasaje del proxy (modelos):', err);
      }
    });
  }


}
