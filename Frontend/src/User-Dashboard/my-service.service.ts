import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private apiUrl = 'http://localhost:5245/api'; // Update with your API URL

  constructor(private http: HttpClient) {}

  getTableNames(): Observable<string[]> {
    console.log('Fetching table names...');
    return this.http.get<string[]>('http://localhost:5245/api/Table/table-names').pipe(
      tap((tables) => console.log('Fetched tables:', tables)), // Log fetched tables
      catchError((error) => {
        console.error('Error fetching table names:', error); // Log full error object
        return of([]); // Return an empty array on error to prevent breaking the observable chain
      })
    );
  }
  
  getTableData(tableName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/table-data?tableName=${tableName}`, {
      params: { tableName }
    });
  }

  
  getTablePrivileges(userId: number, tableName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/UserControllers/table-privileges?userId=${userId}&tableName=${tableName}`);
    
  }

  getIdFieldName(row: any): string | null {
    // Define a pattern for identifying ID fields, e.g., ending with "Id"
    const idFieldPattern = /Id$/;
  
    // Find the key in the object that matches the pattern
    for (const key in row) {
      if (idFieldPattern.test(key)) {
        return key;
      }
    }
    // Return null if no ID field is found
    return null;
  }
  
}
