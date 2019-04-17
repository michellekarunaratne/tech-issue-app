import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEditDetailsComponent } from './staff-edit-details.component';

describe('StaffEditDetailsComponent', () => {
  let component: StaffEditDetailsComponent;
  let fixture: ComponentFixture<StaffEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
