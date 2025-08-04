export interface Detalle {
  nombre: string;
  precioUnitario: number;
  precioTotal: number;
  cantidad: number;
}

export interface Chapista {
  fecha: Date;
  numeroPresupuesto: number; // Nuevo campo
  "señor/es": string;
  localidad: string;
  marcaVehiculo: string;
  modelo: string;
  chapaPatente: string;
  domicilio:string;
  detalle: Detalle[];
  observaciones: string;
  total: number;
}
