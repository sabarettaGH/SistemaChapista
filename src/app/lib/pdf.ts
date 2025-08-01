


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import { variable64 } from "../../../public/img";
import { Chapista, Detalle } from "../interfaces/carga-presupuesto.interface";


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const generateChapistaPDF = (data: Chapista) => {
  // Asegúrate de que data.detalle sea un array válido
  const tableBody = [
    [
      { text: "Nombre", style: "tableHeader" },
      { text: "Cantidad", style: "tableHeader" },
      { text: "Precio Unitario", style: "tableHeader" },
      { text: "Precio Total", style: "tableHeader" },
    ],
    ...data.detalle.map((item: Detalle) => [
      item.nombre,
      item.cantidad.toString(),
      `$ ${item.precioUnitario}`,
      `$ ${item.precioTotal}`,
    ]),
  ];

  const content: any[] = [];

  // --- Encabezado del documento
  content.push({
    columns: [

      {
        stack: [
          // { image: variable64.miVar, width: 50 }, // Logo, si lo tienes
          { text: "SERVICIO DEL AUTOMOTOR EN GENERAL. CHAPA Y PINTURA", style: "headerBusiness" },
          { text: "TODAS LAS MARCAS Y MODELOS de Carlos Rojas", style: "headerBusinessSubtitle" },
          { text: "Mendoza 1580 - 3016 Santo Tome", style: "contactInfo" },
          { text: "cel: 342(15) 4726953", style: "contactInfo" },
          { text: "email: auto_sport@hotmail.com.ar", style: "contactInfo" },
        ],
      },
      {
        stack: [
          { text: "RECIBO DE TRABAJO DE CHAPISTERÍA", style: "header" },
          { text: `Fecha: ${data.fecha.toLocaleDateString()}`, style: "subheader", alignment: "right" },
        ],
        alignment: "right",
      },
    ],
    margin: [0, 0, 0, 20],
 });

  // --- Información del cliente y vehículo
  content.push({
    text: "Datos del Cliente y Vehículo",
    style: "sectionHeader",
    margin: [0, 10, 0, 5],
  });

  content.push({
    columns: [
      {
        stack: [
          { text: `Señor/es: ${data["señor/es"]}`, style: "infoText" },
          { text: `Localidad: ${data.localidad}`, style: "infoText" },
        ],
      },
      {
        stack: [
          { text: `Marca del vehículo: ${data.marcaVehiculo}`, style: "infoText" },
          { text: `Modelo: ${data.modelo}`, style: "infoText" },
          { text: `Chapa Patente: ${data.chapaPatente}`, style: "infoText" },
        ],
      },
    ],
    margin: [0, 0, 0, 20],
  });

  // --- Tabla de detalles
  content.push({
    text: "Detalle de Trabajo",
    style: "sectionHeader",
    margin: [0, 10, 0, 5],
  });

  content.push({
    table: {
      headerRows: 1,
      widths: ["*", "auto", "auto", "auto"],
      body: tableBody,
    },
    layout: "lightHorizontalLines",
    margin: [0, 10, 0, 10],
  });

  // --- Observaciones y total
  content.push({
    text: "Observaciones:",
    style: "sectionHeader",
    margin: [0, 10, 0, 5],
  });
  content.push({
    text: data.observaciones,
    style: "infoText",
    margin: [0, 0, 0, 20],
  });

  content.push({
    columns: [
      { text: "", width: "*" },
      {
        text: `TOTAL: $ ${data.total}`,
        style: "total",
        alignment: "right",
        margin: [0, 10, 0, 10],
      },
    ],
  });

  // --- Definición de estilos
  const styles = {
    header: {
      fontSize: 18,
      bold: true,
      alignment: "right",
    },
    subheader: {
      fontSize: 12,
      margin: [0, 5, 0, 5],
    },
    sectionHeader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5],
      decoration: "underline",
    },
    infoText: {
      fontSize: 12,
      margin: [0, 2, 0, 2],
    },
    tableHeader: {
      bold: true,
      fontSize: 12,
      color: "black",
      fillColor: "#eeeeee",
    },
    total: {
      fontSize: 14,
      bold: true,
    },
  };

  const docDefinition: any = {
    content,
    styles,
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generateChapistaPDF;
