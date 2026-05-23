import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // 👈 1. Importamos ChangeDetectorRef
import { PeliculasService } from '../../services/peliculas';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [], // Mantén esto limpio como lo dejamos con el @for nativo
  templateUrl: './peliculas.html',
  styleUrls: ['./peliculas.css']
})
export class PeliculasComponent implements OnInit, OnDestroy {
  listaPeliculas: any[] = [];
  private destroy$ = new Subject<void>();

  // 👈 2. Lo inyectamos en el constructor como 'cdr'
  constructor(
    private peliculaService: PeliculasService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.peliculaService.getPeliculas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resultado) => {
          this.listaPeliculas = resultado;

          console.log('Datos asignados con éxito:', this.listaPeliculas);

          // 🚀 3. LA CLAVE: Le avisamos a Angular que mutamos la variable 
          // para que redibuje el @for inmediatamente sin esperar un evento externo
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error en el pasaje del proxy:', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}