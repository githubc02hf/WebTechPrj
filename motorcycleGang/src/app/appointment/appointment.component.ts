import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email])
  firstName = new FormControl('', [Validators.required])
  lastName = new FormControl('', [Validators.required])

  getErrorMessage() {
    if (this.email.hasError('required') || this.firstName.hasError('required') || this.lastName.hasError('required') ) {
      return 'You must enter a value'
    }
    return this.email.hasError('email') ? 'Not a valid email' : ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
