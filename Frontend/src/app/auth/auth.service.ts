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
  

  // Example of a simple login method
  login(password: string): boolean {
    // Replace this logic with your actual authentication API call
   
      localStorage.setItem('token', password); // Store a token or authentication state
      console.log(localStorage.getItem('token'));
      
    return true;
  }

  // Example of logout method
  logout(): void {
    localStorage.removeItem('token'); // Clear the token when the user logs out
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Return true if token exists, otherwise false
  }
 
  
}
