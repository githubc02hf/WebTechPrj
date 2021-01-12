import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { Appointment } from 'src/app/entities/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultAppointmentService implements AppointmentService {

  apiAppointmentUrl = 'http://localhost:3000/api/appointments/';
  headers = new HttpHeaders().set('Accept', 'application/json');
  appointmentList: Appointment[];

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    let observable = this.http.get<Appointment[]>(this.apiAppointmentUrl, { headers });
    observable.subscribe(
      appointments => {
        this.appointmentList = appointments;
      },
      err => {
        console.error('Error getting appointment', err);
      }
    )
    return observable;
  };

  getMatchingAppointmentsFromList(pattern: string) {
    const filterBy = (term) => {
      const termLowerCase = term.toLowerCase()
      return (appointment) =>
        Object.keys(appointment)
          .some(prop => appointment[prop].toString().toLowerCase().indexOf(termLowerCase) !== -1)
    }
    var newAppointmentList = this.appointmentList.filter(filterBy(pattern));
    return newAppointmentList;
  };

  saveAppointment(appointment): void {
    console.log(""+ this.appointmentExists(appointment));
    if (this.appointmentExists(appointment)) {
      this.deleteAppointment(appointment);
    }
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
      this.http
      .post<Appointment[]>(this.apiAppointmentUrl, appointment, {headers})
      .subscribe(
        appointment => {
            console.log(appointment);
        },
        err => {
          console.error('Error saving appointment', err);
      });
  };

  deleteAppointment(appointment): void {
    this.http
      .delete(this.apiAppointmentUrl + appointment.id)
      .subscribe(
        appointment => {
        },
        err => {
          console.error('Could not delete appointment with id ' + appointment.id, err);
        }
      );
  }

  appointmentExists(newAppointment): boolean {
    for (const oldAppointment of this.appointmentList){
      if(oldAppointment.id===newAppointment.id){
        return true;
      }
    }
    return false;
  }

  updateAppointmentList(): void {
    this.getAppointments()
      .subscribe(
        appointments => {
          this.appointmentList = appointments;
        },
        err => {
          console.error('Error getting appointment');
        }
      )
  }
}
