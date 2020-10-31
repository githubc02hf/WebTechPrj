import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Motorcycle} from '../entities/motorcycle';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateNumber} from '../../shared/validators/number-validator';

@Component({
  selector: 'app-motorcycle',
  templateUrl: './motorcycle.component.html'
})

export class MotorcycleComponent implements OnInit, AfterViewInit {

  // TODO Child-Compontent • Soll per Data-Binding Daten von Parent-Component erhalten und an diese senden

  motorcycles: Array<Motorcycle> = [];
  selectedMotorcycle: Motorcycle;
  displayedColumns: string[] = ['id', 'brand', 'model', 'horsepower', 'color', 'delete'];
  selectedId: -1;
  datasource: MatTableDataSource<Motorcycle>;
  registerForm: FormGroup;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {

    this.datasource = new MatTableDataSource(this.motorcycles);
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.search();

    this.registerForm = this.formBuilder.group({

      id: [{value: null, disabled: true}, {updateOn: 'change'}],
      brand: [null, {validators: [Validators.required], updateOn: 'change'}],
      model: [null, {validators: [Validators.required], updateOn: 'change'}],
      horsepower: [null, {validators: [Validators.required, validateNumber], updateOn: 'change'}],
      horsepowerMin: [null, {updateOn: 'change'}],
      horsepowerMax: [null, {updateOn: 'change'}],
      color: [null, {validators: [Validators.required], updateOn: 'change'}],

    });
  }

  search(): void {
    const apiUrl = 'http://localhost:3000/api/motorcycles/';

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
      .get<Motorcycle[]>(apiUrl, {params, headers})
      .subscribe(
        motorcycle => {
          this.motorcycles = motorcycle;
          this.datasource = new MatTableDataSource(this.motorcycles);
          this.datasource.sort = this.sort;
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
    }else {
      console.log('hier');
    }
    const apiUrl = 'http://localhost:3000/api/motorcycles/';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    if (this.registerForm.get('id').value >= 1) {
      this.deleteMotorcycleById(this.registerForm.get('id').value);
    }
    const motorcycle = this.createNewMotorcycle();
    this.saveMotorcycle(apiUrl, headers, motorcycle);

    if (this.registerForm.get('id').value === undefined) {
      this.unsetFields();
    }
    this.search();

  }

  saveMotorcycle(apiUrl, headers, motorcycleToSave): void {
    motorcycleToSave.horsepower = parseInt(motorcycleToSave.horsepower, 10);
    this.http
      .post<Motorcycle>(apiUrl, motorcycleToSave, {headers})
      .subscribe(
        motorcycle => {
          this.selectedMotorcycle = motorcycle;
        },
        err => {
          console.error('saving motorcycle failed', err);
        }
      );
  }

  deleteMotorcycleById(id): void {
    this.unsetFields();
    const apiUrl = 'http://localhost:3000/api/motorcycles/';

    this.http
      .delete(apiUrl + id)
      .subscribe(
        motorcycle => {
        },
        err => {
          console.error('Could not delete motorcycle with id ' + this.selectedMotorcycle.id, err);
        }
      );

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
