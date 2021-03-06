import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Motorcycle} from '../../../entities/motorcycle';
import {MotorcycleService} from '../../services/motorcycle.service';

@Component({
  selector: 'app-motorcycle-card',
  templateUrl: './motorcycle-card.component.html',
  styleUrls: ['./motorcycle-card.component.css']
})
export class MotorcycleCardComponent implements OnInit {

  @Input() motorcycle: Motorcycle;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter();
  @Input() selectedMotorcycle: Motorcycle;
  @Output() selectedMotorcycleChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectMotorcycle(): void {
    this.selected = !this.selected;
    if (this.selected) {
      this.selectedMotorcycleChange.emit(this.motorcycle);
    } else {
      this.selectedMotorcycleChange.emit(new Motorcycle());
    }
    this.selectedChange.emit(this.selected);
  }

}
