import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../shared/models/login-credentials';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pipco-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private errorText: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  public login(event: Event) {
    event.preventDefault();
    const loginCredentials: LoginCredentials = {
      user: event.target["username"].value,
      password: event.target["password"].value
    }
    this.subscriptions.push(this.authService.authenticate(loginCredentials).subscribe(result => {
      if (result) {
        this.router.navigate(["main"]);
      }
      else {
        this.errorText = "Wrong username or password.";
      }
    }))
  }
}