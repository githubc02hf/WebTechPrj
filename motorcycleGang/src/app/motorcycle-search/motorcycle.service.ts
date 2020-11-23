import {Injectable} from '@angular/core';
import {DefaultMotorcycleService} from './default-motorcycle.service';
import {Observable} from 'rxjs';
import {Motorcycle} from '../entities/motorcycle';

@Injectable({
  providedIn: 'root',
  useClass: DefaultMotorcycleService
})
export abstract class MotorcycleService {

  abstract find(params): Observable<Motorcycle[]>;

  abstract save(motorcycleToSave): Motorcycle;

  abstract deleteById(id): void;

}
