import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCreateJobTicketComponent } from './staff-create-job-ticket.component';

describe('StaffCreateJobTicketComponent', () => {
  let component: StaffCreateJobTicketComponent;
  let fixture: ComponentFixture<StaffCreateJobTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffCreateJobTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCreateJobTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
