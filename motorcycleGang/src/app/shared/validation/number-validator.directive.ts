import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[number]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NumberValidatorDirective,
      multi: true
    }
  ]
})
export class NumberValidatorDirective implements Validator {

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {

    if (control.value && (isNaN(control.value) || control.value <= 0)) {
      return {
        number: {
          actualNumber: control.value
        }
      };
    }
    return null;

  }

}
