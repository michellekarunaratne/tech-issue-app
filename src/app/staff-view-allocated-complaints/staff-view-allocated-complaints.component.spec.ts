import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { StaffViewAllocatedComplaintsComponent } from './staff-view-allocated-complaints.component';

describe('StaffViewAllocatedComplaintsComponent', () => {
  let component: StaffViewAllocatedComplaintsComponent;
  let fixture: ComponentFixture<StaffViewAllocatedComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffViewAllocatedComplaintsComponent ],
      imports:[ReactiveFormsModule,HttpClientTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
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
