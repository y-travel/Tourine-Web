import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnLayoutComponent } from './trn-layout.component';

describe('TrnLayoutComponent', () => {
  let component: TrnLayoutComponent;
  let fixture: ComponentFixture<TrnLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
