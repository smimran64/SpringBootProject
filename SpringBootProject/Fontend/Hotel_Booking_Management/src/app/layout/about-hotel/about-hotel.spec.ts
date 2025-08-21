import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHotel } from './about-hotel';

describe('AboutHotel', () => {
  let component: AboutHotel;
  let fixture: ComponentFixture<AboutHotel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutHotel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutHotel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
