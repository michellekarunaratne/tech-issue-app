import { TestBed } from '@angular/core/testing';

import { StoreStatusService } from './store-status.service';

describe('StoreStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreStatusService = TestBed.get(StoreStatusService);
    expect(service).toBeTruthy();
  });
});
