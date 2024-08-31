import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private apiUrl = 'http://localhost:5000/api'; // Update with your API URL

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

  getTablePrivileges(tableName: string): Observable<{ [key: string]: boolean }> {
    return this.http.get<{ [key: string]: boolean }>(`${this.apiUrl}/Table/table-privileges`, {
      params: { tableName }
    }).pipe(
      tap((privileges) => console.log('Fetched table privileges:', privileges)),
      catchError((error) => {
        console.error('Error fetching table privileges:', error);
        return of({ Read: false, Write: false, Update: false, Delete: false }); // Default to no privileges on error
      })
    );
  }
  
}
