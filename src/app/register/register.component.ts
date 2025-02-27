import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PasswordMatchDirective } from '../core/validation/password-match.directive';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, PasswordMatchDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.status);
      form.resetForm();
    } else {
      form.form.markAllAsTouched();
    }
  }
}
