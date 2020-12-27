import { TestBed } from '@angular/core/testing';

import { DefaultAppointmentService } from './default-appointment.service';

describe('DefaultAppointmentService', () => {
  let service: DefaultAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
