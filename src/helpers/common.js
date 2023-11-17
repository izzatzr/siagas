import jsPDF from "jspdf";

require("jspdf-autotable");

export const diffDate = (date) => {
  const currentDate = new Date();
  const deadline = new Date(date);

  const diffTime = Math.ceil(deadline - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

export const setBgColorByDiffDate = (value) => {
  const diffDate = parseInt(value);

  if (diffDate > 15) {
    return "bg-[#05FF00]";
  } else if (diffDate >= 6 && diffDate <= 15) {
    return "bg-[#FAFF00]";
  } else if (diffDate >= 1 && diffDate < 6) {
    return "bg-[#FF0000]";
  } else {
    return "bg-white";
  }
};

const json = [
  {
    id: 8418,
    start: "2021-10-25T00:00:00.000Z",
    end: "2021-10-25T00:00:00.000Z",
    duration: "03:00:00",
    name: "Absence/Holiday/Etc.",
    project: "VARIE",
    task: "Hours Off",
    comment: "PERMESSO",
  },
  {
    id: 8248,
    start: "2021-10-09T00:00:00.000Z",
    end: "2021-10-09T00:00:00.000Z",
    duration: "03:00:00",
    name: "INDRA - AST",
    project: "C_17_INDR_03",
    task: "Overtime",
    comment: "STRAORDINARIO",
  },
  {
    id: 8257,
    start: "2021-10-08T00:00:00.000Z",
    end: "2021-10-08T00:00:00.000Z",
    duration: "08:00:00",
    name: "Casillo",
    project: "C_17_BUSI_01",
    task: "Smart Working",
    comment: null,
  },
];

export const printToPDF = (headerColumn, jsonData, fileName, titlePdf) => {
  const pdf = new jsPDF("p", "pt", "a4");
  let xOffset =
    pdf.internal.pageSize.width / 2 -
    (pdf.getStringUnitWidth(titlePdf) * pdf.internal.getFontSize()) / 2;
  pdf.text(titlePdf, xOffset, 40, "center");
  pdf.autoTable(headerColumn, jsonData, {
    startY: 65,
    theme: "grid",
    styles: {
      font: "serif",
      halign: "center",
      cellPadding: 3.5,
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
    },
    headStyles: {
      textColor: [0, 0, 0],
      fontStyle: "normal",
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      fillColor: [135, 206, 250],
    },
    alternateRowStyles: {
      fillColor: [226, 227, 229],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    rowStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    tableLineColor: [0, 0, 0],
  });

  pdf.save(fileName);
};

export const convertCurrentDataScore = (value) => {
  switch (value) {
    case "SK Kepala Perangkat Daerah":
      return "6.00";
    case "SK Kepala Daerah":
      return "3.00";
    case "Peraturan Kepala Daerah / Peraturan Daerah":
      return "9.00";
    case "Tidak dapat diukur":
      return "0.00";
    default:
      return "-";
  }
};

export const convertEvaluationScore = (currentData, category) => {
  let valueCurrentData = 0;
  let valueCategory = 0;

  switch (currentData) {
    case "SK Kepala Perangkat Daerah":
      valueCurrentData = 25;
      break;
    case "SK Kepala Daerah":
      valueCurrentData = 25;
      break;
    case "Peraturan Kepala Daerah / Peraturan Daerah":
      valueCurrentData = 50;
      break;
    default:
      valueCurrentData = 0;
      break;
  }

  switch (category) {
    case "Sesuai":
      valueCategory = 50;
      break;

    default:
      valueCategory = 0;
      break;
  }

  return parseFloat(valueCurrentData + valueCategory).toFixed(2)
};
