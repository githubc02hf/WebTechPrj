import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/entities/appointment';
import { DefaultAppointmentService } from './default-appointment.service'

@Injectable({
  providedIn: 'root',
  useClass: DefaultAppointmentService
})
export abstract class AppointmentService {
  appointmentList: Array<Appointment>
  constructor() { }

  abstract getAppointments(): Observable<Appointment[]>;

  abstract getMatchingAppointmentsFromList(pattern: string): Array<Appointment>;

  abstract saveAppointment(appointment): void; 

  abstract deleteAppointment(appointment): void;

}
