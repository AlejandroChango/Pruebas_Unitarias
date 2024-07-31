// src/app/meses/excel.service.mock.ts
export class MockExcelService {
    exportAsExcelFile(json: any[], excelFileName: string): void {
      // Método simulado para pruebas
      console.log('Exporting Excel file:', excelFileName);
      console.log('Data:', json);
    }
  }
  