//this auth service is created so that userid from login can be strode and travel to other components

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string =localStorage.getItem('userId') || '';
  private userName: string = localStorage.getItem('userName') || '';
  private currentUserTable: string = localStorage.getItem('currentUserTable') || 'Student';

  setCurTable(table: string): void {
    this.currentUserTable = table;
    localStorage.setItem('currentUserTable', table); // Save to local storage
  }

  getCurTable(): string {
    return this.currentUserTable;
  }

  setUserId(uId: number): void {
    this.userId = uId.toString();
    localStorage.setItem('userId', uId.toString());
    
  }
 
  getUserId(): number  {
    return Number.parseInt(this.userId);
  }
  setUserName(uName: string): void {
    this.userName = uName;
    localStorage.setItem('userName', uName);
  }

  getUserName(): string  {
    return this.userName;
  }
 
 
  
}
