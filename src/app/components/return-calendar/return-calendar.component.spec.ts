import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCalendarComponent } from './return-calendar.component';

describe('ReturnCalendarComponent', () => {
  let component: ReturnCalendarComponent;
  let fixture: ComponentFixture<ReturnCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
