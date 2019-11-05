import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureItemsComponent } from './departure-items.component';

describe('DepartureItemsComponent', () => {
  let component: DepartureItemsComponent;
  let fixture: ComponentFixture<DepartureItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartureItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
