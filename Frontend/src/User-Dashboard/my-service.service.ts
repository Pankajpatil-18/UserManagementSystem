import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';


interface Request {
  id: number;
  userId: number;
  userName: string;
  tableName: string;
  canRead: boolean;
  canWrite: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  requestType: string;
  date: string;
  status: string;
}

interface UserPermissions {
  userId: number;
  canRead: boolean;
  canWrite: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}
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

  // data.service.ts
getRequests(table: string): Observable<Request[]> {
  return this.http.get<Request[]>(`/api/requests?table=${table}`);
}

// Assuming this is in your service file
// Service method to fetch permissions for a single userId
getPrivilegesForUser(userId: number, tableName: string): Observable<UserPermissions> {
  const params = new HttpParams()
    .set('userId', userId.toString())
    .set('tableName', tableName);

  return this.http.get<UserPermissions>(`${this.apiUrl}/UserControllers/table-privileges`, { params });
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
