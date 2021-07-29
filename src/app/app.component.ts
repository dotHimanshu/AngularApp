import { HostListener } from '@angular/core';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/interface/users';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TestAngular';
  currentUser: User;

  constructor(private route: Router, private loginService: LoginService) {
    this.loginService.currentUser$.subscribe((x) => (this.currentUser = x));

    if (this.currentUser) {
      this.route.navigate(['home']);
    }
  }

  logout() {
    this.loginService.logout();
    this.route.navigate(['/login']);
  }

  isLoggedIn() {
    return this.currentUser != null;
  }
}
