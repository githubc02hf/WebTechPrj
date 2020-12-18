import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/entities/customer';
import { DefaultCustomerService } from './default-customer.service';

@Injectable({
  providedIn: 'root',
  useClass: DefaultCustomerService
})
export abstract class CustomerService {
  customerList: Array<Customer>
  constructor() { }

  abstract getCustomers(): Observable<Customer[]>;

  abstract getMatchingCustomersFromList(pattern: string): Array<Customer>;

  abstract saveCustomer(customer: Customer): void;

  abstract deleteCustomer(customer: Customer): void;

}

