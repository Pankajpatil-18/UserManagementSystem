import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  // Regex pattern for validating email addresses
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && !emailRegex.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  };
}
