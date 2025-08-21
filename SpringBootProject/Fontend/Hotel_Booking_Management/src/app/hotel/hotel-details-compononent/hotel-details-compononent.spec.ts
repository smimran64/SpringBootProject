import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailsCompononent } from './hotel-details-compononent';

describe('HotelDetailsCompononent', () => {
  let component: HotelDetailsCompononent;
  let fixture: ComponentFixture<HotelDetailsCompononent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelDetailsCompononent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelDetailsCompononent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
