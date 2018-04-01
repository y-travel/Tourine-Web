import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPassengersComponent } from './tour-passengers.component';

describe('TourPassengersComponent', () => {
  let component: TourPassengersComponent;
  let fixture: ComponentFixture<TourPassengersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourPassengersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
