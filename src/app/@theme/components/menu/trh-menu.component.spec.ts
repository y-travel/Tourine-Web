import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrhMenuComponent } from './trh-menu.component';

describe('TrhMenuComponent', () => {
  let component: TrhMenuComponent;
  let fixture: ComponentFixture<TrhMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrhMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrhMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
