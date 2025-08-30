import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserProfileComponent } from './all-user-profile-component';

describe('AllUserProfileComponent', () => {
  let component: AllUserProfileComponent;
  let fixture: ComponentFixture<AllUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
