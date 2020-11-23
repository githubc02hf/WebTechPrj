import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Motorcycle} from '../entities/motorcycle';
import {Observable} from 'rxjs';
import {MotorcycleService} from './motorcycle.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultMotorcycleService implements MotorcycleService {

  constructor(private http: HttpClient) {
  }

  find(params): Observable<Motorcycle[]> {
    const apiUrl = 'http://localhost:3000/api/motorcycles/';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http
      .get<Motorcycle[]>(apiUrl, {params, headers});
  }

  save(motorcycleToSave): Motorcycle {
    const apiUrl = 'http://localhost:3000/api/motorcycles/';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    motorcycleToSave.horsepower = parseInt(motorcycleToSave.horsepower, 10);
    this.http
      .post<Motorcycle>(apiUrl, motorcycleToSave, {headers})
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
    const apiUrl = 'http://localhost:3000/api/motorcycles/';

    this.http
      .delete(apiUrl + id)
      .subscribe(
        motorcycle => {
        },
        err => {
          console.error('Could not delete motorcycle with id ' + id, err);
        }
      );
  }

}
