import { Component, OnInit } from '@angular/core';
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


  constructor(private customerService: CustomerService) { 
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


}