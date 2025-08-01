import { Component } from '@angular/core';
import { Chapista} from '../interfaces/carga-presupuesto.interface';


import { FormsModule } from '@angular/forms';
import generateChapistaPDF from '../lib/pdf';


@Component({
  selector: 'app-carga-presupuesto',
  imports: [FormsModule],
  templateUrl: './carga-presupuesto.component.html',
  styleUrl: './carga-presupuesto.component.css'
})
export class CargaPresupuestoComponent {
   public datosPresupuesto: Chapista = {
    fecha: new Date(),
    "señor/es": '',
    localidad: '',
    marcaVehiculo: '',
    modelo: '',
    chapaPatente: '',
    detalle: [
      // Un ítem por defecto para empezar
      { nombre: '', precioUnitario: 0, cantidad: 1, precioTotal: 0 },
    ],
    observaciones: '',
    total: 0
  };

  constructor() { }

  /**
   * Esta función se ejecuta cada vez que cambia un campo de precio o cantidad.
   * Calcula el precio total de cada ítem y el total general.
   */
  calcularTotal(): void {
    let totalGeneral = 0;
    this.datosPresupuesto.detalle.forEach(item => {
      item.precioTotal = item.cantidad * item.precioUnitario;
      totalGeneral += item.precioTotal;
    });
    this.datosPresupuesto.total = totalGeneral;
  }

  /**
   * Agrega un nuevo ítem vacío a la lista de detalles.
   */
  agregarItem(): void {
    this.datosPresupuesto.detalle.push({
      nombre: '',
      precioUnitario: 0,
      cantidad: 1,
      precioTotal: 0
    });
    this.calcularTotal();
  }

  /**
   * Elimina un ítem de la lista por su índice.
   * @param index El índice del ítem a eliminar.
   */
  eliminarItem(index: number): void {
    this.datosPresupuesto.detalle.splice(index, 1);
    this.calcularTotal();
  }

  /**
   * Genera el PDF con los datos del formulario.
   */
  onGeneratePDF(): void {
    // Aquí se llama a la función de generación de PDF.
    // Los datos ya están actualizados gracias a ngModel.
    generateChapistaPDF(this.datosPresupuesto);
  }
}




