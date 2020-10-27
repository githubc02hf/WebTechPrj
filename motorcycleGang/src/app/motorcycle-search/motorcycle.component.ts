import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Motorcycle} from '../entities/motorcycle';

@Component({
  selector: 'app-motorcycle',
  templateUrl: './motorcycle.component.html'
})

export class MotorcycleComponent implements OnInit {

  id: number;
  brand: string;
  model: string;
  horsepowerMin: number;
  horsepowerMax: number;
  horsepower: number;
  color: string;
  motorcycles: Array<Motorcycle> = [];
  selectedMotorcycle: Motorcycle;
  displayedColumns: string[] = ['id', 'brand', 'model', 'horsepower', 'color'];

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.search();
  }

  search(): void {
    const apiUrl = 'http://localhost:3000/api/motorcycles';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    console.log(this.brand);
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
        },
        err => {
          console.error('Error loading motorcycles', err);
        }
      );
  }

  createNew(): void {

  }

}
