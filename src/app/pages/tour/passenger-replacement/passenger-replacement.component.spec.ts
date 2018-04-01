import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerReplacementComponent } from './passenger-replacement.component';

describe('PassengerReplacementComponent', () => {
  let component: PassengerReplacementComponent;
  let fixture: ComponentFixture<PassengerReplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerReplacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
