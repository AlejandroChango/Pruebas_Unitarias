import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { By } from '@angular/platform-browser'; // Importar para buscar elementos en el DOM
import { mesesComponent } from './meses.component';

describe('mesesComponent', () => {
  let component: mesesComponent;
  let fixture: ComponentFixture<mesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ mesesComponent ],
      imports: [ FormsModule ] // Importar FormsModule para [(ngModel)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(mesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe inicializar lmesesini con 12 meses', () => {
    component.fijarListaMeses();
    expect(component.lmesesini.length).toBe(12);
  });

  it('Debe establecer el periodo al año actual', () => {
    const anioactual = new Date().getFullYear();
    expect(component.fperiodo).toBe(anioactual);
  });

  it('Debe permitir solo números y no superar el año actual', () => {
    component.setPeriodo('2024');
    expect(component.fperiodo).toBe(2024);

    component.setPeriodo('2025');
    expect(component.fperiodo).toBe(2024); // Años futuros no deben ser aceptados

    component.setPeriodo('abc');
    expect(component.fperiodo).toBe(2024); // Letras no deben ser aceptadas

    component.setPeriodo('1900');
    expect(component.fperiodo).toBe(1900); // Valor mínimo válido

    component.setPeriodo('1899');
    expect(component.fperiodo).toBe(1900); // Valores menores al mínimo no deben ser aceptados
  });

  it('Debe mostrar un mensaje de error si el periodo está vacío', () => {
    component.fperiodo = null;
    fixture.detectChanges(); // Actualiza el DOM con los cambios

    component.consultar();
    fixture.detectChanges(); // Actualiza el DOM con los cambios

    // Busca el elemento del mensaje de error en el DOM
    const errorMessageElement = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorMessageElement.textContent).toContain("INGRESE EL PERIODO");
  });

  it('Debe mostrar un mensaje de error si el periodo es superior al año actual', () => {
    component.fperiodo = new Date().getFullYear() + 1;
    component.consultar();
    fixture.detectChanges(); // Actualiza el DOM con los cambios

    const errorMessageElement = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorMessageElement.textContent).toContain("PERIODO SUPERIOR AL AÑO ACTUAL");
  });

  it('Debe mostrar un mensaje de error si no se selecciona un mes', () => {
    component.finicio = '';
    component.consultar();
    fixture.detectChanges(); // Actualiza el DOM con los cambios

    const errorMessageElement = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorMessageElement.textContent).toContain("ESCOGER MES DE CONSULTA");
  });

  it('Debe generar reporte si todos los datos son válidos', () => {
    spyOn(component, 'generarReporte'); // Espía para verificar si se llama a generarReporte
    component.fperiodo = new Date().getFullYear();
    component.finicio = '01'; // Asumiendo que se selecciona enero
    component.consultar();
    expect(component.generarReporte).toHaveBeenCalled();
  });
});
