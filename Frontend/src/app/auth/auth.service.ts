//this auth service is created so that userid from login can be strode and travel to other components

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId!: number ;
  private userName!: string ;
  private currentUserTable: string = localStorage.getItem('currentUserTable') || 'Student';

  setCurTable(table: string): void {
    this.currentUserTable = table;
    localStorage.setItem('currentUserTable', table); // Save to local storage
  }

  getCurTable(): string {
    return this.currentUserTable;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }
 
  getUserId(): number  {
    return this.userId;
  }
  setUserName(userName: string): void {
    this.userName = userName;
  }

  getUserName(): string  {
    return this.userName;
  }
 
 
  
}
