import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminAndCustomerGuard } from './admin-and-customer-guard';

describe('adminAndCustomerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminAndCustomerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
