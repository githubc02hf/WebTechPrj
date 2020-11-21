import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Customer } from '../entities/customer';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  dataSource = [
    {id: 1, firstName: 'a', lastName: 'b', gender: 'male',},
    {id: 2, firstName: 'a', lastName: 'b', gender: 'male',},
    {id: 3, firstName: 'a', lastName: 'b', gender: 'male',},
    {id: 4, firstName: 'a', lastName: 'b', gender: 'male',},
    {id: 5, firstName: 'a', lastName: 'b', gender: 'male',}
  ];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender'];
  customerList: Array<Customer>;
  registerForm: FormGroup;
  datasourceC: MatTableDataSource<Customer>;
  //displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'phoneNumber', 'email','creationDate'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.search;
  } 

  search(){
    //myDate = new Date();
    const apiUrl = 'http://localhost:3000/api/customer/';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    let params = new HttpParams();

    if (this.registerForm) {
      params = new HttpParams()
        .set('brand_like', this.registerForm.get('brand').value ? this.registerForm.get('brand').value : '')
        .set('model_like', this.registerForm.get('model').value ? this.registerForm.get('model').value : '')
        .set('horsepower_gte', this.registerForm.get('horsepowerMin').value ? this.registerForm.get('horsepowerMin').value : '')
        .set('horsepower_lte', this.registerForm.get('horsepowerMax').value ? this.registerForm.get('horsepowerMax').value : '99999999')
        .set('horsepower_like', this.registerForm.get('horsepower').value ? this.registerForm.get('horsepower').value : '')
        .set('color_like', this.registerForm.get('color').value ? this.registerForm.get('color').value : '');
    }

    this.http
    .get<Customer[]>(apiUrl, {params, headers})
    .subscribe(
      customer => {
        this.customerList = customer;
        this.datasourceC = new MatTableDataSource(this.customerList);
      },
      err => {
        console.error('Error loading customers', err);
      }
    )
  }

}
