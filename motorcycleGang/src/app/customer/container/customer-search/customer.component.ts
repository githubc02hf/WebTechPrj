import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Customer } from '../../../entities/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  searchFieldInput: string;
  selectedCustomer: Customer;
  customerList: Array<Customer>;
  @Output() editCustomerEvent = new EventEmitter();
  newCustomer: Customer;


  constructor(private customerService: CustomerService) { 
    this.newCustomer = new Customer();
    this.newCustomer.id = 0;
    this.newCustomer.firstName = "";
    this.newCustomer.lastName = "";
    this.newCustomer.gender = "";
    this.newCustomer.phoneNumber = "";
    this.newCustomer.email = "";
    this.newCustomer.motorcycleId = 0;
    this.newCustomer.appointmentId = 0;
  }

  ngOnInit(): void {
    this.fillCustomerList();
  } 

  fillCustomerList(): void {
    this.customerService.getCustomers()
      .subscribe(
        customers => {
          this.customerList = customers;
        },
        err => {
          console.error('Error getting customer', err);
        }
      )
  }

  searchForCustomers(){
    if(this.searchFieldInput===undefined || this.searchFieldInput===''){
      this.fillCustomerList();
      return;
    }
    this.customerList = this.customerService.getMatchingCustomersFromList(this.searchFieldInput);
   };


   createCustomer(){
     this.editCustomerEvent.emit(this.newCustomer);
   }
}