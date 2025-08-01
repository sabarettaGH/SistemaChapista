export interface Detalle{
nombre: string,
precioUnitario: number,
precioTotal: number,
cantidad: number
}

export interface Chapista {
fecha: Date,
"señor/es": string,
localidad: string,
marcaVehiculo: string,
modelo: string,
chapaPatente: string,
detalle: Detalle[],
observaciones: string,
total: number,
}


