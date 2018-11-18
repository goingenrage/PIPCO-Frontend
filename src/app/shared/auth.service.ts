import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials } from './models/login-credentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private isAuthenticated: boolean = JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  public isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  public authenticate(loginCredentials: LoginCredentials): Observable<boolean> {
    return this.http.post<boolean>(environment.backendAdress + "/login", loginCredentials, environment.backendHttpOptions);
  }
/*
    if (username === "user" && password === "geheim") {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }*/
}
