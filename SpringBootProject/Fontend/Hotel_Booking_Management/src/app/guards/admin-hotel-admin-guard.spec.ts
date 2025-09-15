import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminHotelAdminGuard } from './admin-hotel-admin-guard';

describe('adminHotelAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminHotelAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
