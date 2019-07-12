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
/**
 * @param subscriptions an array of all subscriptions this component is subscribed to
 * @param errorText the text of the currently displayed error
 * @param isLoading used to display an animation when loading data
 */
 export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public errorText: string;
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  /**
   * try to login via AuthService by checking the submitted login credentials
   * @param event the event that is created upon submitting the login form
   */
  login(event: Event): void {
    // prevent default event behaviour - page reload for example
    event.preventDefault();

    this.errorText = "";
    this.isLoading = true;

    const loginCredentials: LoginCredentials = {
      user: event.target["username"].value,
      password: event.target["password"].value
    }
    this.subscriptions.push(this.authService.authenticate(loginCredentials).subscribe(result => {
      this.isLoading = false;
      if (result) {
        this.router.navigate(["main"]);
      }
      else {
        this.errorText = "Login failed.";
      }
    }))
  }
}