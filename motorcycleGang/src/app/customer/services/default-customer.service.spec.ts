import { TestBed } from '@angular/core/testing';

import { DefaultCustomerService } from './default-customer.service';

describe('DefaultCustomerService', () => {
  let service: DefaultCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
