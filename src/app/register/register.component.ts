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

  onSubmit(form: NgForm) {
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
            this.router.navigate(['/courses']);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            form.resetForm();
          },
        });
    } else {
      form.form.markAllAsTouched();
    }
  }
}
