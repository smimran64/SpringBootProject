import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hotelAdminGuard } from './hotel-admin-guard';

describe('hotelAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hotelAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
