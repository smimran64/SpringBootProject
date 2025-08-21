import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAdminProfile } from './hotel-admin-profile';

describe('HotelAdminProfile', () => {
  let component: HotelAdminProfile;
  let fixture: ComponentFixture<HotelAdminProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelAdminProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelAdminProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
