import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { CustomerDashBoardComponent } from './customer-dash-board.component';

describe('CustomerDashBoardComponent', () => {
  let component: CustomerDashBoardComponent;
  let fixture: ComponentFixture<CustomerDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDashBoardComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
