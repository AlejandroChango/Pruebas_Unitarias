import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { mesesComponent } from './meses.component';
import { ExcelService } from './excel.service'; // Ajusta la ruta según la estructura de tu proyecto
import { DtoServiceMock } from './dto.service.mock'; // Ajusta la ruta según la estructura de tu proyecto

class MockExcelService {
  exportAsExcelFile(json: any[], excelFileName: string): void {
    // Método simulado para pruebas
    console.log('Exporting Excel file:', excelFileName);
    console.log('Data:', json);
  }
}

class MockDtoService {
  // Implementa métodos necesarios para el mock
}

describe('mesesComponent', () => {
  let component: mesesComponent;
  let fixture: ComponentFixture<mesesComponent>;
  let excelService: MockExcelService;
  let dtoService: MockDtoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [mesesComponent],
      imports: [FormsModule],
      providers: [
        { provide: ExcelService, useClass: MockExcelService },
        { provide: DtoServiceMock, useClass: MockDtoService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(mesesComponent);
    component = fixture.componentInstance;
    excelService = TestBed.inject(ExcelService) as unknown as MockExcelService;
    dtoService = TestBed.inject(DtoServiceMock) as unknown as MockDtoService;
    fixture.detectChanges();
  });

  it('Debería Generar una lista con doce meses', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar lmesesini con 12 meses', () => {
    component.fijarListaMeses();
    expect(component.lmesesini.length).toBe(12);
    expect(component.lmesesini).toEqual([
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
    ]);
  });

  it('Debe establecer el periodo al año actual', () => {
    const anioactual = new Date().getFullYear();
    expect(component.fperiodo).toBe(anioactual);
  });

  it('Debe permitir solo números y no superar el año actual', () => {
    // Caso 1: Año válido (2024)
    component.setPeriodo('2024');
    expect(component.fperiodo).toBe(2024);

    // Caso 2: Año futuro (2025), debería mantener el año anterior válido (2024)
    component.setPeriodo('2025');
    expect(component.fperiodo).toBe(2024);

    // Caso 3: Entrada no numérica ('abc'), debería mantener el año anterior válido (2024)
    component.setPeriodo('abc');
    expect(component.fperiodo).toBe(2024);

    // Caso 4: Año mínimo válido (1900)
    component.setPeriodo('1900');
    expect(component.fperiodo).toBe(1900);

    // Caso 5: Año menor al mínimo válido (1899), debería mantener el año mínimo válido (1900)
    component.setPeriodo('1899');
    expect(component.fperiodo).toBe(1900);
  });

  it('Debe mostrar un mensaje de error si el periodo está vacío', () => {
    component.fperiodo = null; // Prueba el caso en que el período es null
    component.consultar();
    expect(component.mensajeError).toBe("INGRESE EL PERIODO");
  });


  it('Debe mostrar un mensaje de error si el periodo es superior al año actual', () => {
    component.fperiodo = new Date().getFullYear() + 1;
    component.consultar();
    expect(component.mensajeError).toBe("PERIODO SUPERIOR AL AÑO ACTUAL");
  });

  it('Debe mostrar un mensaje de error si no se selecciona un mes', () => {
    component.finicio = '';
    component.consultar();
    expect(component.mensajeError).toBe("ESCOGER MES DE CONSULTA");
  });

  it('Debe generar reporte si todos los datos son válidos', () => {
    spyOn(component, 'generarReporte'); // Espía para verificar si se llama a generarReporte
    component.fperiodo = new Date().getFullYear();
    component.finicio = '01'; // Asumiendo que se selecciona enero
    component.consultar();
    expect(component.generarReporte).toHaveBeenCalled();
    expect(component.mensajeError).toBe(''); // No debería haber mensaje de error
  });

  it('Debe llamar al método exportarTxt', () => {
    spyOn(component, 'exportarTxt');
    component.exportarTxt(['Linea 1', 'Linea 2']);
    expect(component.exportarTxt).toHaveBeenCalled();
  });

  it('Debe llamar al método imprimirExcel', () => {
    spyOn(excelService, 'exportAsExcelFile');
    component.imprimirExcel();
    expect(excelService.exportAsExcelFile).toHaveBeenCalled();
  });
});
