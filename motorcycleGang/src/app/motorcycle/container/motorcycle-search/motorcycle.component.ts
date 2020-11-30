import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Motorcycle} from '../../../entities/motorcycle';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MotorcycleService} from '../../services/motorcycle.service';
import {NumberValidatorDirective} from "../../../shared/validation/number-validator.directive";

@Component({
  selector: 'app-motorcycle',
  templateUrl: './motorcycle.component.html'
})

export class MotorcycleComponent implements OnInit {

  // TODO Child-Compontent • Soll per Data-Binding Daten von Parent-Component erhalten und an diese senden

  motorcycles: Array<Motorcycle> = [];
  selectedMotorcycle: Motorcycle;
  displayedColumns: string[] = ['id', 'brand', 'model', 'horsepower', 'color', 'delete'];
  selectedId: -1;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private motorcycleService: MotorcycleService) {

  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.search();

    this.registerForm = this.formBuilder.group({

      id: [{value: null, disabled: true}, {updateOn: 'change'}],
      brand: [null, {validators: [Validators.required], updateOn: 'change'}],
      model: [null, {validators: [Validators.required], updateOn: 'change'}],
      horsepower: [null, {validators: [Validators.required, new NumberValidatorDirective()], updateOn: 'change'}],
      horsepowerMin: [null, {updateOn: 'change'}],
      horsepowerMax: [null, {updateOn: 'change'}],
      color: [null, {validators: [Validators.required], updateOn: 'change'}],

    });
  }

  search(): void {

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

    this.motorcycleService
      .find(params)
      .subscribe(
        motorcycle => {
          this.motorcycles = motorcycle;
        },
        err => {
          console.error('Error loading motorcycles', err);
        }
      );
  }

  handleSave(): void {
    if (this.registerForm.invalid) {
      this.registerForm.get('brand').markAsTouched();
      this.registerForm.get('model').markAsTouched();
      this.registerForm.get('horsepower').markAsTouched();
      this.registerForm.get('color').markAsTouched();
      return;
    }

    const motorcycle = this.createNewMotorcycle();
    this.selectedMotorcycle = this.motorcycleService.save(motorcycle);

    if (this.registerForm.get('id').value === undefined) {
      this.unsetFields();
    }
    this.search();

  }

  deleteMotorcycleById(id): void {
    this.unsetFields();

    this.motorcycleService.deleteById(id);

    this.search();

  }

  deleteMotorcycleByIdEventHandler(id, event): void {
    event.stopPropagation();
    this.deleteMotorcycleById(id);
  }

  select(motorcycle): void {
    if (this.registerForm.get('id').value === motorcycle.id) {
      this.unsetFields();
    } else {
      this.selectedMotorcycle = motorcycle;
      this.setFields();
    }
  }

  createNewMotorcycle(): Motorcycle {
    const motorcycle = new Motorcycle();

    motorcycle.id = 0;
    motorcycle.brand = this.registerForm.get('brand').value;
    motorcycle.model = this.registerForm.get('model').value;
    motorcycle.color = this.registerForm.get('color').value;
    motorcycle.horsepower = this.registerForm.get('horsepower').value;

    return motorcycle;
  }

  setFields(): void {
    this.registerForm.get('id').setValue(this.selectedMotorcycle.id);
    this.registerForm.get('brand').setValue(this.selectedMotorcycle.brand);
    this.registerForm.get('model').setValue(this.selectedMotorcycle.model);
    this.registerForm.get('horsepower').setValue(this.selectedMotorcycle.horsepower);
    this.registerForm.get('color').setValue(this.selectedMotorcycle.color);
  }

  unsetFields(): void {
    this.registerForm.get('id').setValue(undefined);
    this.registerForm.get('brand').setValue('');
    this.registerForm.get('model').setValue('');
    this.registerForm.get('horsepower').setValue(undefined);
    this.registerForm.get('color').setValue('');
  }

}
