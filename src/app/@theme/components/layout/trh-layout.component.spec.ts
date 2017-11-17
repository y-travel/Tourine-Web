import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrhLayoutComponent } from './trh-layout.component';

describe('TrhLayoutComponent', () => {
  let component: TrhLayoutComponent;
  let fixture: ComponentFixture<TrhLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrhLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrhLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
