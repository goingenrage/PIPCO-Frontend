import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { LoginCredentials } from './models/login-credentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public isAuthenticated: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  authenticate(loginCredentials: LoginCredentials): Observable<boolean> {
    let response = this.http.post<boolean>(environment.backendAdress + "/login", loginCredentials, environment.backendHttpOptions)
    return new Observable(observer => {
      this.subscriptions.push(response.subscribe(result => {
        if (result) {
          this.isAuthenticated = true;
        }
        observer.next(this.isAuthenticated);
        observer.complete();
      }, error => {
        observer.next(this.isAuthenticated);
        observer.complete();
      }));
    });
  }
}
