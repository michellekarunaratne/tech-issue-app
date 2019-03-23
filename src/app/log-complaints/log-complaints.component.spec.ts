import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogComplaintsComponent } from './log-complaints.component';

describe('LogComplaintsComponent', () => {
  let component: LogComplaintsComponent;
  let fixture: ComponentFixture<LogComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
