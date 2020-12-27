import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../../../entities/appointment';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {

  appointments: Array<Appointment> = [];
  appointmentForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      date: new FormControl(''),
      issue: new FormControl(''),
    });
  }

  handleSave(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.get('firstName').markAsTouched();
      this.appointmentForm.get('lastName').markAsTouched();
      this.appointmentForm.get('phoneNumber').markAsTouched();
      this.appointmentForm.get('email').markAsTouched();
      this.appointmentForm.get('date').markAsTouched();
      this.appointmentForm.get('issue').markAsTouched();
      return;
    } else {

    }
    const apiUrl = "http://localhost:3000/api/appointments";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const 
    appointment = this.createNewAppointment();
    this.saveAppointment(apiUrl, httpOptions, appointment);
    this.appointmentForm.reset();
  }

  createNewAppointment(): Appointment {
    const appointment = new Appointment();

    appointment.id = 0;
    appointment.firstName = this.appointmentForm.get('firstName').value;
    appointment.lastName = this.appointmentForm.get('lastName').value;
    appointment.phoneNumber = this.appointmentForm.get('phoneNumber').value;
    appointment.email = this.appointmentForm.get('email').value;
    const formattedDate = formatDate(this.appointmentForm.get('date').value, 'dd/MM/yyyy', 'en-US');
    appointment.preferredDate = formattedDate;
    appointment.issue = this.appointmentForm.get('issue').value;

    return appointment;
  }

  saveAppointment(apiUrl, httpOptions, appointment): void {
    this.http
      .post<Appointment>(apiUrl, appointment, httpOptions)
      .subscribe(appointment => {
        return appointment;
      }, error => {
        console.error('Can not save appointment', error);
      } )
  }
}
