import {AbstractControl, ValidationErrors} from '@angular/forms';

export function validateNumber(c: AbstractControl): ValidationErrors | null {
  if (c.value && isNaN(c.value)) {
    return {
      number: {
        actualNumber: c.value
      }
    };
  } else {
    return null;
  }

}
