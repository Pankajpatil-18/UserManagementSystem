//this auth service is created so that userid from login can be strode and travel to other components

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: number | null = null;
  private userName: string | null = null;

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getUserId(): number | null {
    return this.userId;
  }
  setUserName(userName: string): void {
    this.userName = userName;
  }

  getUserName(): string | null {
    return this.userName;
  }
}
