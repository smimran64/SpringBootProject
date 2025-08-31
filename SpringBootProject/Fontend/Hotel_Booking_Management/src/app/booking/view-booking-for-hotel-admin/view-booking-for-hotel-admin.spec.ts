import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingForHotelAdmin } from './view-booking-for-hotel-admin';

describe('ViewBookingForHotelAdmin', () => {
  let component: ViewBookingForHotelAdmin;
  let fixture: ComponentFixture<ViewBookingForHotelAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBookingForHotelAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookingForHotelAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
