import { Component } from '@angular/core';
import { ExcelService } from './excel.service'; // Asegúrate de ajustar la ruta según la estructura de tu proyecto
import { DtoServiceMock } from './dto.service.mock'; // Asegúrate de ajustar la ruta según la estructura de tu proyecto

@Component({
  selector: 'app-meses',
  templateUrl: './meses.component.html',
  styleUrls: ['./meses.component.css']
})
export class mesesComponent {
  lmesesini: { label: string, value: string }[] = [];
  fperiodo: number | null = new Date().getFullYear();
  finicio: string = '';
  mensajeError: string = '';

  constructor(private excelService: ExcelService, private dtoService: DtoServiceMock) {
    this.fijarListaMeses();
  }

  setPeriodo(periodo: string) {
    const añoActual = new Date().getFullYear();
    const añoMinimo = 1900;
    const valor = Number(periodo);

    if (!isNaN(valor)) {
      if (valor > añoActual) {
        this.fperiodo = añoActual;
      } else if (valor < añoMinimo) {
        this.fperiodo = añoMinimo;
      } else {
        this.fperiodo = valor;
      }
    } else {
      this.fperiodo = añoActual;
    }
  }

  fijarListaMeses() {
    this.lmesesini = [
      { label: "ENERO", value: '01' },
      { label: "FEBRERO", value: '02' },
      { label: "MARZO", value: '03' },
      { label: "ABRIL", value: '04' },
      { label: "MAYO", value: '05' },
      { label: "JUNIO", value: '06' },
      { label: "JULIO", value: '07' },
      { label: "AGOSTO", value: '08' },
      { label: "SEPTIEMBRE", value: '09' },
      { label: "OCTUBRE", value: '10' },
      { label: "NOVIEMBRE", value: '11' },
      { label: "DICIEMBRE", value: '12' }
    ];
  }

  consultar() {
    if (this.fperiodo === null || this.fperiodo === undefined || this.fperiodo === 0) {
      this.mensajeError = "INGRESE EL PERIODO";
      return;
    }
    if (this.fperiodo > new Date().getFullYear()) {
      this.mensajeError = "PERIODO SUPERIOR AL AÑO ACTUAL";
      return;
    }
    if (!this.finicio) {
      this.mensajeError = "ESCOGER MES DE CONSULTA";
      return;
    }
    this.mensajeError = '';
    this.generarReporte();
  }
  

  generarReporte() {
    // Simulación de generación de reporte
    console.log('Generando reporte...');
  }

  exportarTxt(datos: string[]) {
    const blob = new Blob([datos.join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  imprimirExcel() {
    const datos = [
      ['Columna1', 'Columna2'],
      ['Dato1', 'Dato2'],
      ['Dato3', 'Dato4']
    ];
    this.excelService.exportAsExcelFile(datos, 'reporte');
  }
}
