import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meses',
  templateUrl: './meses.component.html',
  styleUrls: ['./meses.component.css']
})
export class mesesComponent implements OnInit {
  lmesesini: { label: string, value: string }[] = [];
  anioactual: number = new Date().getFullYear();
  fperiodo: number | null = this.anioactual;
  finicio: string = ''; // Suponiendo que es el mes seleccionado
  mensajeError: string = '';

  constructor() { }

  ngOnInit() {
    this.fijarListaMeses();
    this.fperiodo = this.anioactual;
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

  setPeriodo(value: string) {
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 1900 && numValue <= this.anioactual) {
      this.fperiodo = numValue;
    } else {
      this.mostrarMensajeError("PERIODO NO VÁLIDO");
    }
  }

  estaVacio(valor: any): boolean {
    return valor === null || valor === undefined || valor === '';
  }

  mostrarMensajeError(mensaje: string) {
    this.mensajeError = mensaje;
  }

  consultar() {
    if (this.fperiodo === null) {
      this.mostrarMensajeError("INGRESE EL PERIODO");
      return;
    }
  
    if (this.fperiodo > this.anioactual) {
      this.mostrarMensajeError("PERIODO SUPERIOR AL AÑO ACTUAL");
      return;
    }
  
    if (this.estaVacio(this.finicio)) {
      this.mostrarMensajeError("ESCOGER MES DE CONSULTA");
      return;
    }
  
    this.generarReporte();
  }

  generarReporte() {
    // Lógica para generar el reporte
  }
}
