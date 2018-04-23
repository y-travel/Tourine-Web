import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourReportsComponent } from './tour-reports.component';

describe('TourReportsComponent', () => {
  let component: TourReportsComponent;
  let fixture: ComponentFixture<TourReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
