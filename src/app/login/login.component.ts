import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  authService = inject(AuthService);

  isInvalidUser = false;

  onSubmit(form: NgForm) {
    this.isInvalidUser = false;
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      this.authService
        .login(email, password)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (resData) => {
            if (resData) {
              this.router.navigate(['/courses']);
            }
            this.isInvalidUser = true;
          },
          error: (errorMessage) => {
            console.log(errorMessage);
          },
        });
    } else {
      form.form.markAllAsTouched();
    }
  }
}
