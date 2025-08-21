import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponenent } from './home-componenent';

describe('HomeComponenent', () => {
  let component: HomeComponenent;
  let fixture: ComponentFixture<HomeComponenent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponenent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponenent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
