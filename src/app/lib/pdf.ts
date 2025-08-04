import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import { variable64 } from "../../../public/img";
import { Chapista, Detalle } from "../interfaces/carga-presupuesto.interface";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const generateChapistaPDF = (data: Chapista) => {
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

  // --- Encabezado con información de la empresa y del presupuesto
  content.push({
    columns: [
      {
        stack: [
          // { image: variable64.miVar, width: 50 },
          { text: "Auto Sport", style: "companyTitle" },
          { text: "SERVICIO DEL AUTOMOTOR EN GENERAL", style: "companySubtitle" },
          { text: "CHAPA Y PINTURA, TODAS LAS MARCAS Y MODELOS", style: "companySubtitle" },
          { text: "de Carlos Rojas", style: "companySubtitle" },
          { text: "Mendoza 1580-3016 Santo Tomé", style: "contactInfo" },
          { text: "Cel.: 342 (15) 4 726953", style: "contactInfo" },
          { text: "email: auto_sport@hotmail.com.ar", style: "contactInfo" },
        ],
      },
      {
        stack: [
          { text: "PRESUPUESTO", style: "budgetTitle", alignment: "right" },
          { text: `N° ${data.numeroPresupuesto}`, style: "budgetNumber", alignment: "right" },
          { text: `FECHA: ${data.fecha.toLocaleDateString()}`, style: "budgetDate", alignment: "right" },
        ],
        alignment: "right",
      },
    ],
    margin: [0, 0, 0, 20],
  });

  // --- Información del cliente y vehículo
  content.push({
    columns: [
      {
        stack: [
          { text: `Señor/es: ${data["señor/es"]}`, style: "clientInfo" },
          { text: `Domicilio: ${data.domicilio}`, style: "clientInfo" },
          { text: `Localidad: ${data.localidad}`, style: "clientInfo" },
        ],
      },
      {
        stack: [
          { text: `Marca Vehículo: ${data.marcaVehiculo}`, style: "clientInfo" },
          { text: `Modelo: ${data.modelo}`, style: "clientInfo" },
          { text: `Chapa Patente: ${data.chapaPatente}`, style: "clientInfo" },
        ],
      },
    ],
    margin: [0, 0, 0, 20],
  });

  // --- Tabla de detalles
  content.push({
    text: "DETALLE",
    style: "tableHeaderTitle",
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
    text: "OBSERVACIONES:",
    style: "observationsTitle",
    margin: [0, 10, 0, 5],
  });
  content.push({
    text: data.observaciones,
    style: "observationsText",
    margin: [0, 0, 0, 20],
  });

  content.push({
    columns: [
      { text: `TOTAL $ ${data.total}`, style: "total", alignment: "right" },
    ],
    margin: [0, 10, 0, 10],
  });

  content.push({
    text: "(*) PRESUPUESTO VÁLIDO POR 30 DÍAS",
    style: "validityText",
    alignment: "left",
    margin: [0, 5, 0, 5],
  });

  content.push({
    text: "DUPLICADO",
    style: "duplicateText",
    alignment: "center",
    margin: [0, 20, 0, 0],
  });

  // --- Definición de estilos
  const styles = {
    companyTitle: { fontSize: 14, bold: true },
    companySubtitle: { fontSize: 10 },
    contactInfo: { fontSize: 8, margin: [0, 1, 0, 1] },
    budgetTitle: { fontSize: 20, bold: true, color: "black" },
    budgetNumber: { fontSize: 16, color: "black", margin: [0, 5, 0, 5] },
    budgetDate: { fontSize: 10, margin: [0, 5, 0, 5] },
    clientInfo: { fontSize: 10, margin: [0, 2, 0, 2] },
    tableHeaderTitle: { fontSize: 10, bold: true, decoration: "underline" },
    tableHeader: { bold: true, fontSize: 10, color: "black" },
    observationsTitle: { fontSize: 10, bold: true },
    observationsText: { fontSize: 10, margin: [0, 2, 0, 2] },
    total: { fontSize: 14, bold: true },
    validityText: { fontSize: 8 },
    duplicateText: { fontSize: 10, bold: true, color: "#999999" },
  };

  const docDefinition: any = {
    content,
    styles,
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generateChapistaPDF;
