import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnCheckboxComponent } from './trn-checkbox.component';

describe('TrnCheckboxComponent', () => {
  let component: TrnCheckboxComponent;
  let fixture: ComponentFixture<TrnCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
