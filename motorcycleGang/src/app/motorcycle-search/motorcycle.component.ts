import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Motorcycle} from '../entities/motorcycle';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-motorcycle',
  templateUrl: './motorcycle.component.html'
})

export class MotorcycleComponent implements OnInit, AfterViewInit {

  // TODO validator, Child-Compontent • Soll per Data-Binding Daten von Parent-Component erhalten und an diese senden

  id: number;
  brand: string;
  model: string;
  horsepowerMin: number;
  horsepowerMax: number;
  horsepower: number;
  color: string;
  motorcycles: Array<Motorcycle> = [];
  selectedMotorcycle: Motorcycle;
  displayedColumns: string[] = ['id', 'brand', 'model', 'horsepower', 'color', 'delete'];
  selectedId: -1;
  datasource: MatTableDataSource<Motorcycle>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {

    this.datasource = new MatTableDataSource(this.motorcycles);
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.search();
  }

  search(): void {
    const apiUrl = 'http://localhost:3000/api/motorcycles/';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    const params = new HttpParams()
      .set('brand_like', this.brand ? this.brand : '')
      .set('model_like', this.model ? this.model : '')
      .set('horsepower_gte', this.horsepowerMin ? this.horsepowerMin.toString() : '0')
      .set('horsepower_lte', this.horsepowerMax ? this.horsepowerMax.toString() : '99999999')
      .set('horsepower_like', this.horsepower ? this.horsepower.toString() : '')
      .set('color_like', this.color ? this.color : '');

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
    const apiUrl = 'http://localhost:3000/api/motorcycles/';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    if (this.id) {
      this.deleteMotorcycleById(this.id);
    }
    const motorcycle = this.createNewMotorcycle();
    this.saveMotorcycle(apiUrl, headers, motorcycle);

    if (!this.id) {
      this.unsetFields();
    }
    this.search();

  }

  saveMotorcycle(apiUrl, headers, motorcycleToSave): void {
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
    if (this.id === motorcycle.id) {
      this.unsetFields();
    } else {
      this.selectedMotorcycle = motorcycle;
      this.setFields();
    }
  }

  createNewMotorcycle(): Motorcycle {
    const motorcycle = new Motorcycle();

    motorcycle.id = 0;
    motorcycle.brand = this.brand;
    motorcycle.model = this.model;
    motorcycle.color = this.color;
    motorcycle.horsepower = this.horsepower;

    return motorcycle;
  }

  setFields(): void {
    this.id = this.selectedMotorcycle.id;
    this.brand = this.selectedMotorcycle.brand;
    this.model = this.selectedMotorcycle.model;
    this.horsepower = this.selectedMotorcycle.horsepower;
    this.color = this.selectedMotorcycle.color;
  }

  unsetFields(): void {
    this.id = undefined;
    this.brand = '';
    this.model = '';
    this.horsepower = undefined;
    this.color = '';
  }

}
