import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewForHotelAdmin } from './view-for-hotel-admin';

describe('ViewForHotelAdmin', () => {
  let component: ViewForHotelAdmin;
  let fixture: ComponentFixture<ViewForHotelAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewForHotelAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewForHotelAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
