import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewAllocatedComplaintsComponent } from './staff-view-allocated-complaints.component';

describe('StaffViewAllocatedComplaintsComponent', () => {
  let component: StaffViewAllocatedComplaintsComponent;
  let fixture: ComponentFixture<StaffViewAllocatedComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffViewAllocatedComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewAllocatedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
