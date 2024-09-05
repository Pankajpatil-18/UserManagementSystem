import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
    private apiUrl = 'http://localhost:5245/api/Request';

    constructor(private http: HttpClient) {}
  
    submitRequest(requestData: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/submit`, requestData);
    }
  
    getUserRequests(userId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
    }
    


  
  
}
