import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerUpsertComponent } from './passenger-upsert.component';

describe('PassengerUpsertComponent', () => {
  let component: PassengerUpsertComponent;
  let fixture: ComponentFixture<PassengerUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
