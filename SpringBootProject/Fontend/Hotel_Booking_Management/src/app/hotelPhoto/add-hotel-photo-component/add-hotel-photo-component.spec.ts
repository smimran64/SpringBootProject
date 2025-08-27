import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelPhotoComponent } from './add-hotel-photo-component';

describe('AddHotelPhotoComponent', () => {
  let component: AddHotelPhotoComponent;
  let fixture: ComponentFixture<AddHotelPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHotelPhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHotelPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
