import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private isAuthenticated: boolean = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  public isAuthenticated: boolean = false;

  constructor() { }

  public authenticate(username: string, password: string): boolean {
    if (username === "user" && password === "geheim") {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
}
