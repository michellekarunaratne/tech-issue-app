import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { StaffManuallyAllocateComplaintsComponent } from './staff-manually-allocate-complaints.component';

describe('StaffManuallyAllocateComplaintsComponent', () => {
  let component: StaffManuallyAllocateComplaintsComponent;
  let fixture: ComponentFixture<StaffManuallyAllocateComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffManuallyAllocateComplaintsComponent ],
      imports:[ReactiveFormsModule,HttpClientTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
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
