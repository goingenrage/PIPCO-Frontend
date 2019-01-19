import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { LoginCredentials } from './models/login-credentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * @param subscriptions an array of all subscriptions this component is or was subscribed to
 * @param isAuthenticated user authentication status
 */
export class AuthService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public isAuthenticated: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  /**
   * try to authenticate the user by checking the login credentials via backend api
   * @param loginCredentials login credentials that are submitted via login form
   */
  authenticate(loginCredentials: LoginCredentials): Observable<boolean> {
    let response = this.http.post<boolean>(environment.backendAddress + "/login", loginCredentials, environment.backendHttpOptions)
    // returning a new observable to eliminate race condition
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
