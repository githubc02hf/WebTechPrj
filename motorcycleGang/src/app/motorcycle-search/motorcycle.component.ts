import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Motorcycle} from '../entities/motorcycle';

@Component({
  selector: 'app-motorcycle',
  templateUrl: './motorcycle.component.html'
})

export class MotorcycleComponent implements OnInit {

  id: number;
  brand: string;
  model: string;
  horsepower: number;
  color: string;
  motorcycles: Array<Motorcycle> = [];

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  getAll(): void {
    const apiUrl = 'localhost:3000/api/motorcycles';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    this.http
      .get<Motorcycle[]>(apiUrl, {headers})
      .subscribe(
        motorcycle => {
          this.motorcycles = motorcycle;
        },
        error => {
          console.error('Error loading motorcycles', error);
        }
      );
  }

}
