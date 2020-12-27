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
          console.log(""+ this.appointmentList.length)
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
  };

  highlight(row) {
    console.log("row id: " + row.id);
    if(this.selectedRowIndex === row.id) {
      this.selectedRowIndex = -1;
    } else {
    this.selectedRowIndex = row.id;
    }
  }

  deleteById(id) {
    this.appointmentService.deleteById(id);
    this.searchForAppointments();
  }
}
