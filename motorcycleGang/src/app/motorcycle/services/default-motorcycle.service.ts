import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Motorcycle} from '../../entities/motorcycle';
import {Observable} from 'rxjs';
import {MotorcycleService} from './motorcycle.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultMotorcycleService implements MotorcycleService {

  apiUrl = 'http://localhost:3000/api/motorcycles/';
  headers = new HttpHeaders().set('Accept', 'application/json');

  constructor(private http: HttpClient) {
  }

  find(params): Observable<Motorcycle[]> {
    return this.http
      .get<Motorcycle[]>(this.apiUrl, {params, headers: this.headers});
  }

  save(motorcycleToSave): Motorcycle {
    motorcycleToSave.horsepower = parseInt(motorcycleToSave.horsepower, 10);
    this.http
      .post<Motorcycle>(this.apiUrl, motorcycleToSave, {headers: this.headers})
      .subscribe(
        motorcycle => {
          return motorcycle;
        },
        err => {
          console.error('saving motorcycle failed', err);
        }
      );
    return new Motorcycle();
  }

  deleteById(id): void {
    this.http
      .delete(this.apiUrl + id)
      .subscribe(
        motorcycle => {
        },
        err => {
          console.error('Could not delete motorcycle with id ' + id, err);
        }
      );
  }

}
