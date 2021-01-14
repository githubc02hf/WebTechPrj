import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: 'input[phone]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PhoneNumberDirective,
    multi: true
  }]

})
export class PhoneNumberDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl) : ValidationErrors | null {
    if (control.value && isNaN(control.value) && control.value.length >= 10 || control.value.length <= 4) {
      return { 
        phoneNumber: {
          actualPhoneNumber: control.value
        }
       };
    }
    return null; 
  }
}
