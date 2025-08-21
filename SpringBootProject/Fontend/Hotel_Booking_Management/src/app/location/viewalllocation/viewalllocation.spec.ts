import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewalllocation } from './viewalllocation';

describe('Viewalllocation', () => {
  let component: Viewalllocation;
  let fixture: ComponentFixture<Viewalllocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewalllocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewalllocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
