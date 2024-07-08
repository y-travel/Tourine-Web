import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTourListComponent } from './agency-tour-list.component';

describe('AgencyTourListComponent', () => {
  let component: AgencyTourListComponent;
  let fixture: ComponentFixture<AgencyTourListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyTourListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyTourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
