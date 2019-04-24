import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManuallyAllocateComplaintsComponent } from './staff-manually-allocate-complaints.component';

describe('StaffManuallyAllocateComplaintsComponent', () => {
  let component: StaffManuallyAllocateComplaintsComponent;
  let fixture: ComponentFixture<StaffManuallyAllocateComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffManuallyAllocateComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffManuallyAllocateComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
