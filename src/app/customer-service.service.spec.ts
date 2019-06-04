import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerServiceService } from './customer-service.service';

describe('CustomerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: CustomerServiceService = TestBed.get(CustomerServiceService);
    expect(service).toBeTruthy();
  });
});
