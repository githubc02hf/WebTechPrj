import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/entities/customer';
import { DialogService } from 'src/app/shared/validation/dialog.service';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit {
  @Input() selected: boolean;
  @Input() customer: Customer;
  //@Output() editCustomerEvent = new EventEmitter();
  
  constructor(private dialogService: DialogService,
    private customerService: CustomerService,
    ) {}

  ngOnInit(): void {
  }

  //editCustomer(): void{
  //  this.editCustomerEvent.emit(this.customer);
  //}

  onDelete(){
    this.dialogService.openConfirmDialog("Are you sure to delete this record permanently?").afterClosed().subscribe(res =>{
      if(res){
        this.customerService.deleteCustomer(this.customer);
        console.log(this.customer + " deleted")
      }
    });
  }
}
