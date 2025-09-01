import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPhotoForAdmin } from './hotel-photo-for-admin';

describe('HotelPhotoForAdmin', () => {
  let component: HotelPhotoForAdmin;
  let fixture: ComponentFixture<HotelPhotoForAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelPhotoForAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelPhotoForAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
