import { TestBed } from '@angular/core/testing';

import { DefaultMotorcycleService } from './default-motorcycle.service';

describe('DefaultMotorcycleService', () => {
  let service: DefaultMotorcycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultMotorcycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
