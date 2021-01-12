import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../../../entities/appointment';
import { Customer } from '../../../entities/customer';
import { formatDate } from "@angular/common";
import { CustomerService } from 'src/app/customer/services/customer.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {
  @Input() id: number;
  appointmentToEdit: Appointment;
  appointments: Array<Appointment> = [];
  appointmentForm: FormGroup;
  customers: Array<Customer> = [];
  selectedCustomer: Customer;
  isEdit: boolean = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private customerService: CustomerService, private appointmentService: AppointmentService, private route: ActivatedRoute) {
    this.customerService.getCustomers()
      .subscribe(
        customers => {
          this.customers = customers;
        },
        err => {
          console.error('Error while getting customer', err);
        }
      )
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')  === '0') {
        return;
      } else {
        this.isEdit = true;
        this.id = +params.get('id');
        this.fillFieldsByAppointmentId(this.id);
      }
    });

    this.appointmentForm = this.formBuilder.group({
      customer: new FormControl(''),
      firstName: new FormControl({ value: '', disabled: true }),
      lastName: new FormControl({ value: '', disabled: true }),
      gender: new FormControl({ value: '', disabled: true }),
      phoneNumber: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true }),
      date: new FormControl(''),
      issue: new FormControl('')
    })
  }

  handleSave(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.get('firstName').markAsTouched();
      this.appointmentForm.get('lastName').markAsTouched();
      this.appointmentForm.get('phoneNumber').markAsTouched();
      this.appointmentForm.get('email').markAsTouched();
      this.appointmentForm.get('gender').markAsTouched();
      this.appointmentForm.get('date').markAsTouched();
      this.appointmentForm.get('issue').markAsTouched();
      return;
    } 

    const appointment = this.createNewAppointment();
    this.appointmentService.saveAppointment( appointment );
    this.appointmentForm.reset();
  }

  createNewAppointment(): Appointment {
    const appointment = new Appointment();

    appointment.id = this.isEdit ? this.appointmentToEdit.id : 0;
    appointment.customer = this.appointmentForm.get('customer').value;
    const formattedDate = formatDate(this.appointmentForm.get('date').value, 'MM/dd/yyyy', 'en-US');
    appointment.preferredDate = formattedDate;
    appointment.issue = this.appointmentForm.get('issue').value;
    return appointment;
  }


  customerSelection(customer) {
    this.selectedCustomer = customer;
    this.appointmentForm.get('firstName').setValue(this.selectedCustomer.firstName);
    this.appointmentForm.get('lastName').setValue(this.selectedCustomer.lastName);
    this.appointmentForm.get('gender').setValue(this.selectedCustomer.gender);
    this.appointmentForm.get('phoneNumber').setValue(this.selectedCustomer.phoneNumber);
    this.appointmentForm.get('email').setValue(this.selectedCustomer.email);
  }
 
  fillFieldsByAppointmentId(id) {
    this.appointmentService.getAppointments()
    .subscribe(
      appointments => {
        this.appointments = appointments;
        this.appointmentToEdit = this.appointments.find(appointment => appointment.id === id);
        this.fillFields(this.appointmentToEdit);
      }, 
      err => {
        console.log('Error while getting appointment', err);
      }
    );
  }

  fillFields(appointmentToEdit) {
    this.appointmentForm.patchValue({
      customer: appointmentToEdit.customer
    });
    this.appointmentForm.get('customer').setValue(appointmentToEdit.customer);
    this.appointmentForm.get('firstName').setValue(appointmentToEdit.customer.firstName);
    this.appointmentForm.get('lastName').setValue(appointmentToEdit.customer.lastName);
    this.appointmentForm.get('gender').setValue(appointmentToEdit.customer.gender);
    this.appointmentForm.get('phoneNumber').setValue(appointmentToEdit.customer.phoneNumber);
    this.appointmentForm.get('email').setValue(appointmentToEdit.customer.email);
    let date = new Date(appointmentToEdit.preferredDate);
    this.appointmentForm.get('date').setValue(date);
    this.appointmentForm.get('issue').setValue(appointmentToEdit.issue);
  }
}
