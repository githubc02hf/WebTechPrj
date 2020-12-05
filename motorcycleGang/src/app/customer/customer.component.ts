import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Customer } from '../entities/customer';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { stringify } from 'querystring';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender','phoneNumber','email','actions'];
  dataSource: MatTableDataSource<Customer>;
  customerForm: FormGroup;
  customerList: Array<Customer>;
  searchFieldInput: string;

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
        // fill table
        this.dataSource = new MatTableDataSource(this.customerList);
      },
      err => {
        console.error('Error loading customers', err);
      }
    )
  };

  searchForCustomers(){
    // get fresh dataset from DB
    const apiUrl = 'http://localhost:3000/api/customer/';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    let params = new HttpParams()
        .set('firstName_like', this.searchFieldInput)
        .set('lastName_like', this.searchFieldInput)
        .set('gender_like', this.searchFieldInput)
        .set('phoneNumber_like', this.searchFieldInput)
        .set('email_like', this.searchFieldInput)
        .set('dateOfBirth_like', this.searchFieldInput);


    this.http
    .get<Customer[]>(apiUrl, {params, headers})
    .subscribe(
      customers => {
        this.customerList = customers;
        // fill table
        this.dataSource = new MatTableDataSource(this.customerList);
      },
      err => {
        console.error('Error loading customers', err);
      }
    )
  };
}