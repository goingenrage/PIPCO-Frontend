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
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() { }

  /**
   * logout via AuthService
   */
  logout() {
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