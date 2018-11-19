import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../shared/models/login-credentials';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pipco-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  private wrongLoginInformation: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  public login(event: Event) {
    event.preventDefault();
    const loginCredentials: LoginCredentials = {
      user: event.target["username"].value,
      password: event.target["password"].value
    }
    this.subscriptions.push(this.authService.authenticate(loginCredentials).subscribe(result => {
      console.log(this.authService.isAuthenticated)
      if (this.authService.isAuthenticated) {
        this.router.navigate(["main"]);
      }
      else {
        this.wrongLoginInformation = true;
      }
    }))
  }
}