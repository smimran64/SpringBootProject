import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoomForAdmin } from './view-room-for-admin';

describe('ViewRoomForAdmin', () => {
  let component: ViewRoomForAdmin;
  let fixture: ComponentFixture<ViewRoomForAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRoomForAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoomForAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
