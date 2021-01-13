import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {MotorcycleService} from "../../services/motorcycle.service";
import {FormGroup} from "@angular/forms";
import {Motorcycle} from "../../../entities/motorcycle";
import {ActivatedRoute} from "@angular/router";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-motorcycle-edit',
  templateUrl: './motorcycle-edit.component.html',
  styleUrls: ['./motorcycle-edit.component.css']
})
export class MotorcycleEditComponent implements OnInit {

  @Input() id: string;
  selectedMotorcycle = new Motorcycle();
  brand: string;
  model: string;
  horsepower: number;
  color: string;

  constructor(private motorcycleService: MotorcycleService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.paramMap
      .subscribe(params => {
        this.id = params.get('id');
      });

    this.motorcycleService.find(new HttpParams().set('id', this.id))
      .subscribe(motorcycle => {
        this.selectedMotorcycle = motorcycle[0];
        this.setFields();
        console.log(this.selectedMotorcycle);
      });
  }

  editSelected(): void {
    this.selectedMotorcycle.brand = this.brand;
    this.selectedMotorcycle.model = this.model;
    this.selectedMotorcycle.color = this.color;
    this.selectedMotorcycle.horsepower = this.horsepower;

    this.motorcycleService.deleteById(this.id);
    const motorcycle = this.createMotorcycle();
    this.selectedMotorcycle = this.motorcycleService.save(motorcycle);


  }

  createMotorcycle(): Motorcycle {
    const motorcycle = new Motorcycle();

    motorcycle.id = +this.id;
    motorcycle.brand = this.brand;
    motorcycle.model = this.model;
    motorcycle.color = this.color;
    motorcycle.horsepower = this.horsepower;

    return motorcycle;
  }

  setFields(): void {
    this.brand = this.selectedMotorcycle.brand;
    this.color = this.selectedMotorcycle.color;
    this.model = this.selectedMotorcycle.model;
    this.horsepower = this.selectedMotorcycle.horsepower;
  }

}
