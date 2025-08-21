import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewcustomercomponent } from './viewcustomercomponent';

describe('Viewcustomercomponent', () => {
  let component: Viewcustomercomponent;
  let fixture: ComponentFixture<Viewcustomercomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewcustomercomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewcustomercomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
