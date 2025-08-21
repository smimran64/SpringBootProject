import { TestBed } from '@angular/core/testing';

import { HotelAmenitiesService } from './hotel-amenities.service';

describe('HotelAmenitiesService', () => {
  let service: HotelAmenitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelAmenitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
