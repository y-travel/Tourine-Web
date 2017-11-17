import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrhCheckboxComponent } from './trh-checkbox.component';

describe('TrhCheckboxComponent', () => {
  let component: TrhCheckboxComponent;
  let fixture: ComponentFixture<TrhCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrhCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrhCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
