export interface Detalle {
  detalle: string;
}

export interface Chapista {
  fecha: Date;
  numeroPresupuesto: number | null;
  'señor/es': string;
  localidad: string;
  marcaVehiculo: string;
  modelo: string;
  chapaPatente: string;
  domicilio: string;
  detalle: Detalle[];
  observaciones: string;
  total: number;
}
