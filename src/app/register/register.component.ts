import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PasswordMatchDirective } from '../core/validation/password-match.directive';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, PasswordMatchDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  authService = inject(AuthService);

  successMessage = '';
  errorMessage = '';

  onSubmit(form: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';

    if (form.valid) {
      const user = {
        email: form.value.email,
        password: form.value.password,
      };

      this.authService
        .create(user)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.successMessage = 'User created successfully!';
            this.errorMessage = '';
            setTimeout(() => {
              this.router.navigate(['/courses']);
            }, 2000);
          },
          error: (error) => {
            this.errorMessage = error;
            this.successMessage = '';
            console.error(error);
          },
          complete: () => {
            console.log('here');
            form.resetForm();
          },
        });
    } else {
      form.form.markAllAsTouched();
    }
  }
}
