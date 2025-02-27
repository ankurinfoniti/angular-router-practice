import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  FormGroup,
} from '@angular/forms';

@Directive({
  selector: '[passwordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    },
  ],
})
export class PasswordMatchDirective implements Validator {
  @Input('passwordMatch') passwordMatchFields: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    // This directive expects to be placed on a form or form group

    if (!(control instanceof FormGroup)) {
      return null;
    }

    const [passwordField, confirmPasswordField] = this.passwordMatchFields;

    if (!passwordField || !confirmPasswordField) {
      return null;
    }

    const passwordControl = control.get(passwordField);
    const confirmPasswordControl = control.get(confirmPasswordField);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      // set error on confirm password field
      confirmPasswordControl.setErrors({
        ...confirmPasswordControl.errors,
        passwordMismatch: true,
      });

      return { passwordMismatch: true };
    }

    // If passwords match, remove the passwordMismatch error
    if (confirmPasswordControl.errors) {
      const { passwordMismatch, ...otherErrors } =
        confirmPasswordControl.errors;

      confirmPasswordControl.setErrors(
        Object.keys(otherErrors).length > 0 ? otherErrors : null,
      );
    }

    return null;
  }
}
