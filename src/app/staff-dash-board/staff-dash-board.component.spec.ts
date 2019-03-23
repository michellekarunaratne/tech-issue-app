import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashBoardComponent } from './staff-dash-board.component';

describe('StaffDashBoardComponent', () => {
  let component: StaffDashBoardComponent;
  let fixture: ComponentFixture<StaffDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
