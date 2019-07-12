import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pipco-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService, 
    public router: Router
  ) { }

  ngOnInit() { }

  /**
   * logout via AuthService
   */
  logout(): void {
    this.authService.isAuthenticated = false;
    this.router.navigate([""]);
  }

  /**
   * reload the current route
   */
  refresh(): void {
    location.reload();
  }
} 