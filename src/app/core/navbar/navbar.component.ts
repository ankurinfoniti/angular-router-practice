import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router = inject(Router);

  authService = inject(AuthService);

  isLogin = false;

  ngOnInit() {
    this.authService.isUserLoggedIn.subscribe((value) => {
      this.isLogin = value;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
