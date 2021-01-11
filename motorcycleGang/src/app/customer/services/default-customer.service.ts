import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/entities/customer';
import { CustomerService } from './customer.service';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultCustomerService implements CustomerService{

  apiCustomerUrl = 'http://localhost:3000/api/customer/';
  headers = new HttpHeaders().set('Accept','application/json');
  customerList: Customer[];

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    let observable = this.http.get<Customer[]>(this.apiCustomerUrl, {headers});
    observable.subscribe(
        customer => {
          this.customerList = customer;
        },
        err => {
          console.error('Error getting customer', err);
        }
      )
      return observable;
  };

  getMatchingCustomersFromList(pattern){
    const filterBy = (term) => {
      const termLowerCase = term.toLowerCase()
      return (customer) =>
        Object.keys(customer)
          .some(prop => customer[prop].toString().toLowerCase().indexOf(termLowerCase) !== -1)
    }
    var newCustomerList = this.customerList.filter(filterBy(pattern));
    return newCustomerList;
  };

  saveCustomer(customer): void {
    if (this.customerExists(customer)) {
      this.deleteCustomer(customer);
    }
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
      this.http
      .post<Customer[]>(this.apiCustomerUrl, customer, {headers})
      .subscribe(
        customer => {
            console.log(customer);
        },
        err => {
          console.error('Error saving customers', err);
      });
  };

  deleteCustomer(customer): void {
    // TODO: delete references to motorcycle and appointment
    //this.removeCustomerAppointment(customer);
    //this.removeCustomerBikeConnection(customer);
    this.http.delete(this.apiCustomerUrl + customer.id)
      .subscribe(
        customer => {
        },
        err => {
          console.error("Error deleting customer: " + customer, err);
        }
      );

    this.updateServiceCustomerList();
  }

  customerExists(newCustomer): boolean {
    for (const oldCustomer of this.customerList){
      if(oldCustomer.id===newCustomer.id){
        return true;
      }
    }
    return false;
  }
  
  updateServiceCustomerList(): void {
    this.getCustomers()
      .subscribe(
        customer => {
          this.customerList = customer;
        },
        err => {
          console.error('Error getting customer', err);
        }
      )
  };

 
}
