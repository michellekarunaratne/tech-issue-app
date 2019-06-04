import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { StaffServiceService } from './staff-service.service';

describe('StaffServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: StaffServiceService = TestBed.get(StaffServiceService);
    expect(service).toBeTruthy();
  });
});
