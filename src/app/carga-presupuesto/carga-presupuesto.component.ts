import { Component } from '@angular/core';
import { Chapista } from '../interfaces/carga-presupuesto.interface';
import { FormsModule } from '@angular/forms';
import generateChapistaPDF from '../lib/pdf';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-carga-presupuesto',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './carga-presupuesto.component.html',
  styleUrl: './carga-presupuesto.component.css',
})
export class CargaPresupuestoComponent {
  public datosPresupuesto: Chapista = {
    fecha: new Date(),
    'señor/es': '',
    localidad: '',
    marcaVehiculo: '',
    modelo: '',
    chapaPatente: '',
    detalle: [],
    numeroPresupuesto: null,
    observaciones: '',
    total: 0,
    domicilio: '',
  };

  constructor() {}

  // calcularTotal(): void {
  //     let totalGeneral = 0;
  //     this.datosPresupuesto.detalle.forEach((item) => {
  //     item.precioTotal = item.cantidad * item.precioUnitario;
  //     totalGeneral += item.precioTotal;
  //     });
  //     this.datosPresupuesto.total = totalGeneral;
  // }

  agregarItem(): void {
    this.datosPresupuesto.detalle.push({
      detalle: '',
    });
  }

  eliminarItem(index: number): void {
    this.datosPresupuesto.detalle.splice(index, 1);
  }

  onGeneratePDF(): void {
    generateChapistaPDF(this.datosPresupuesto);
  }
}
