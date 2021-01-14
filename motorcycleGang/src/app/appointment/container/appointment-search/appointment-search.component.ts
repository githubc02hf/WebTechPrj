import { Component, OnInit } from '@angular/core';
import { GridRowStyleBuilder } from '@angular/flex-layout/grid/typings/row/row';
import { Appointment } from 'src/app/entities/appointment';
import { AppointmentService } from '../../services/appointment.service'

@Component({
  selector: 'app-appointment-search',
  templateUrl: './appointment-search.component.html',
  styleUrls: ['./appointment-search.component.css']
})

export class AppointmentSearchComponent implements OnInit {
  searchFieldInput: string;
  appointmentList: Array<Appointment>;
  selectedRowIndex = -1;
  selectedAppointment: Appointment;
  selectedAppointmentId: number;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber', 'preferredDate', 'issue'];

  constructor(private appointmentService: AppointmentService) { 
    this.searchForAppointments();
  }

  ngOnInit(): void {
    this.appointmentList
  }

  fillAppointmentList(): void {
    this.appointmentService.getAppointments()
      .subscribe(
        appointments => {
          this.appointmentList = appointments;
          this.sortAppointments(this.appointmentList);
        },
        err => {
          console.error('Error getting appointment', err);
        }
      )
  }

  searchForAppointments() {
    if(this.searchFieldInput === undefined || this.searchFieldInput ==='') {
      this.fillAppointmentList();
      return;
    }
    this.appointmentList = this.appointmentService.getMatchingAppointmentsFromList(this.searchFieldInput);
    this.sortAppointments(this.appointmentList);
  }

  sortAppointments(appointmentList) {
    appointmentList.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > a.id) {
        return 1;
      }
      return 0;
     })
  }

  

  selectAppointment(row) {
    if(this.selectedRowIndex === row.id) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = row.id;
      this.selectedAppointment = this.appointmentList.find(appointment => appointment.id === row.id);
      this.selectedAppointmentId = row.id;
    }
  }

  deleteAppointment(appointment) {
    this.appointmentService.deleteAppointment(appointment);
    this.searchForAppointments();
  }
}
