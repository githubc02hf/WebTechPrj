import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/entities/customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customer: Customer;

  constructor(
    private route: ActivatedRoute
  ) { }

  customerForm: FormGroup;

  ngOnInit(): void {
    console.log("test1");
    this.fillCustomerFormField();
  }

  fillCustomerFormField(): void {
    this.customer = new Customer();
    this.route.paramMap.subscribe(params => {
      this.customer.id = +params.get('id');
      this.customer.firstName = params.get('firstName');
      this.customer.lastName = params.get('lastName');
      this.customer.gender = params.get('gender');
      this.customer.phoneNumber = +params.get('phoneNumber');
      this.customer.email = params.get('email');
      this.customer.motorcycleId = +params.get('motorcycleId');
      this.customer.appointmentId = +params.get('appointmentId');
    });

      console.log("test");
      console.log(this.customer);
  }

}
