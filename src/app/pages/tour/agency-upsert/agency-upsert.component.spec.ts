import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyUpsertComponent } from './agency-upsert.component';

describe('AgencyUpsertComponent', () => {
  let component: AgencyUpsertComponent;
  let fixture: ComponentFixture<AgencyUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
