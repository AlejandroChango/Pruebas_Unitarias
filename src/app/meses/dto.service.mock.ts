// src/app/dto.service.mock.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DtoServiceMock {

  constructor() { }

  ejecutarConsultaRest(rqConsulta: any): Observable<any> {
    // Devuelve datos simulados para pruebas
    return of({
      cod: 'OK',
      OC_SBG41REPORTE: [
        {
          tipoIdParticipe: 'ID',
          identificacion: '1234567890',
          generoParticipe: 'M',
          estadocivilParticipe: 'S',
          fnacimiento: '2000-01-01',
          fechaIngreso: '2024-01-01',
          estadoParticipe: 'Activo',
          tipoSistema: 'Sistema A',
          baseCalculoAport: 1000,
          relacionLaboral: 'Relación A',
          estadoRegistro: 'Activo',
          factualizacion: '2024-07-01',
          codigoSB: 'SB123'
        }
      ]
    });
  }

  llenarMensaje(resp: any, flag: boolean): void {
    // Implementación de la función
    console.log(resp);
  }

  manejoError(error: any): void {
    // Implementación de la función
    console.error(error);
  }
}
