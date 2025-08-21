import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAdminRegComponent } from './hotel-admin-reg-component';

describe('HotelAdminRegComponent', () => {
  let component: HotelAdminRegComponent;
  let fixture: ComponentFixture<HotelAdminRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelAdminRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelAdminRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
