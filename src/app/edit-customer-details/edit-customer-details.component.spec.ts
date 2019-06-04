import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { EditCustomerDetailsComponent } from './edit-customer-details.component';

describe('EditCustomerDetailsComponent', () => {
  let component: EditCustomerDetailsComponent;
  let fixture: ComponentFixture<EditCustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomerDetailsComponent ],
      imports:[ReactiveFormsModule,HttpClientTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
