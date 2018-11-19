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
    let response = this.http.post<boolean>(environment.backendAdress + "/login", loginCredentials, environment.backendHttpOptions)
    return new Observable(observer => {
      response.subscribe(result => {
        if (result) {
          this.isAuthenticated = true;
        }
        observer.next(this.isAuthenticated);
        observer.complete();
      }, error => {
        observer.next(this.isAuthenticated);
        observer.complete();
      });
    });
  }
}
