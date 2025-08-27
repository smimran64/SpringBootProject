import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHotelPhotoComponent } from './view-hotel-photo-component';

describe('ViewHotelPhotoComponent', () => {
  let component: ViewHotelPhotoComponent;
  let fixture: ComponentFixture<ViewHotelPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHotelPhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHotelPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
