import { TestBed } from '@angular/core/testing';

import { LocaStorageService } from './loca-storage.service';

describe('LocaStorageService', () => {
  let service: LocaStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
