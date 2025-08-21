import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllHotelAdmin } from './view-all-hotel-admin';

describe('ViewAllHotelAdmin', () => {
  let component: ViewAllHotelAdmin;
  let fixture: ComponentFixture<ViewAllHotelAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllHotelAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllHotelAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
