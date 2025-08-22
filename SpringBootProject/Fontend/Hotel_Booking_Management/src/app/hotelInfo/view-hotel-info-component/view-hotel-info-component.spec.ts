import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHotelInfoComponent } from './view-hotel-info-component';

describe('ViewHotelInfoComponent', () => {
  let component: ViewHotelInfoComponent;
  let fixture: ComponentFixture<ViewHotelInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHotelInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHotelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
