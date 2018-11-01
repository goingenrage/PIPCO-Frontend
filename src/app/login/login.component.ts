import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pipco-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  public login(event: Event) {
    event.preventDefault();
    this.authService.authenticate(event.target["username"].value, event.target["password"].value);
    if (this.authService.isAuthenticated){
      this.router.navigate(["main"]);
    }
  }
}
