import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/entities/customer';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit {
  @Input() selected: boolean;
  @Input() customer: Customer;
  @Output() editCustomerEvent = new EventEmitter();
  
  constructor() {}

  ngOnInit(): void {
  }

  editCustomer(): void{
    this.editCustomerEvent.emit(this.customer);
  }

}
