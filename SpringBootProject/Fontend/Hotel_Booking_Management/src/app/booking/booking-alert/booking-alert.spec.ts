import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAlert } from './booking-alert';

describe('BookingAlert', () => {
  let component: BookingAlert;
  let fixture: ComponentFixture<BookingAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingAlert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
