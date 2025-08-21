import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallhotelcomponent } from './viewallhotelcomponent';

describe('Viewallhotelcomponent', () => {
  let component: Viewallhotelcomponent;
  let fixture: ComponentFixture<Viewallhotelcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallhotelcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallhotelcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
