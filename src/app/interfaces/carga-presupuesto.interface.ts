export interface Detalle {
  detalle: string;
}

export interface Chapista {
  fecha: Date;
  numeroPresupuesto: number | null;
  numeroSiniestro: number | null;
  'señor/es': string;
  telefono: string;
  correoElectronico: string;
  localidad: string;
  marcaVehiculo: string;
  modelo: string;
  chapaPatente: string;
  domicilio: string;
  detalle: Detalle[];
  observaciones: string;
  total: number;
}
