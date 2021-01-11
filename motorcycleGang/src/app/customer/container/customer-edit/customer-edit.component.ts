import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/entities/customer';
import { DialogService } from 'src/app/shared/validation/dialog.service';
import { CustomerService } from '../../services/customer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    public dialog: MatDialog,
    private location: Location
  ) { }

  customerForm: FormGroup;

  ngOnInit(): void {
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

    this.customerForm = this.formBuilder.group({
      firstName:['', {updateOn: 'change'}],
      lastName:['', {updateOn: 'change'}],
      gender:['', {updateOn: 'change'}],
      phoneNumber:['', {updateOn: 'change'}],
      email:['', {updateOn: 'change'}],
      motorcycleId:['', {updateOn: 'change'}],
      appointmentId:['', {updateOn: 'change'}]
    });
  }

  onSave(){
    this.dialogService.openConfirmDialog("Are you sure to save this record permanently?").afterClosed().subscribe(res =>{
      if(res){
        this.saveCustomer();
      }
    });

  }
  saveCustomer(){

    if (this.customerForm.get('firstName').value!==''){
      this.customer.firstName = this.customerForm.get('firstName').value;
    }
    if (this.customerForm.get('lastName').value!==''){
      this.customer.lastName = this.customerForm.get('lastName').value;
    }
    if (this.customerForm.get('gender').value!==''){
      this.customer.gender = this.customerForm.get('gender').value;
    }
    if (this.customerForm.get('phoneNumber').value!==''){
      this.customer.phoneNumber = this.customerForm.get('phoneNumber').value;
    }
    if (this.customerForm.get('email').value!==''){
      this.customer.email = this.customerForm.get('email').value;
    }
    if (this.customerForm.get('motorcycleId').value!==''){
      this.customer.motorcycleId = parseInt(this.customerForm.get('motorcycleId').value, 10);
    }
    /*
    if (this.customerForm.get('appointmentId').value!==''){
      this.customer.appointmentId = parseInt(this.customerForm.get('appointmentId').value, 10);
    }
    */

    this.customerService.saveCustomer(this.customer);
  }

onBack(){
  this.location.back();
}
}
