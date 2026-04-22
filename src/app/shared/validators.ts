import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static integer(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return null;
      }
      if (!Number.isInteger(Number(value))) {
        return { integer: { message: 'Must be an integer' } };
      }
      return null;
    };
  }

  static positiveNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return null;
      }
      if (Number(value) < 0) {
        return { positive: { message: 'Must be a positive number' } };
      }
      return null;
    };
  }

  static requiredString(minLength: number = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || value.trim().length < minLength) {
        return { requiredString: { message: `Must be at least ${minLength} characters` } };
      }
      return null;
    };
  }
}
