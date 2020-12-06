import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Customer } from '../../../entities/customer';
import { MatTableDataSource } from '@angular/material/table';
import { isUndefined } from 'util';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerList: Array<Customer>;
  searchFieldInput: string;
  selectedCustomer: Customer;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.search();
  } 

  search(){
    const apiUrl = 'http://localhost:3000/api/customer/';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    let params = new HttpParams();

    this.http
    .get<Customer[]>(apiUrl, {params, headers})
    .subscribe(
      customers => {
        this.customerList = customers;
      },
      err => {
        console.error('Error loading customers', err);
      }
    )
  };

  searchForCustomers(){
    this.customerList = [];
    // get fresh dataset from DB
    const apiUrl = 'http://localhost:3000/api/customer/';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
      if(this.searchFieldInput===undefined){
        this.searchFieldInput='';
      }
    let params = new HttpParams()
        .set('firstName_like', this.searchFieldInput);
    this.addCustomerToListQuery(apiUrl,headers,params);
    params = new HttpParams()
        .set('lastName_like', this.searchFieldInput);
    this.addCustomerToListQuery(apiUrl,headers,params);
    params = new HttpParams()
        .set('gender_like', this.searchFieldInput);
    this.addCustomerToListQuery(apiUrl,headers,params);
    params = new HttpParams()
        .set('phoneNumber_like', this.searchFieldInput);
    this.addCustomerToListQuery(apiUrl,headers,params);
    params = new HttpParams()
        .set('email_like', this.searchFieldInput);
    this.addCustomerToListQuery(apiUrl,headers,params);
    params = new HttpParams()
        .set('motorcycleId_like', this.searchFieldInput);
    this.addCustomerToListQuery(apiUrl,headers,params);
    params = new HttpParams()
        .set('appointmentId_like', this.searchFieldInput);
    this.addCustomerToListQuery(apiUrl,headers,params);
 };

 addCustomerToListQuery(apiUrl: string, headers: HttpHeaders,params: HttpParams){
    this.http
    .get<Customer[]>(apiUrl, {params, headers})
    .subscribe(
      customers => {
        for (var customer of customers){
          var added = false;
          for(var appendedCustomer of this.customerList){
            if(appendedCustomer.id === customer.id){
              added = true;
            }
          }
          if (!added){
            this.customerList.push(customer);
          }
        }
        console.log(this.customerList);
      },
      err => {
        console.error('Error loading customers', err);
      }
    )
 };
}