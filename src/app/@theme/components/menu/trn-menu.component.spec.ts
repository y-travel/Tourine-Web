import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnMenuComponent } from './trn-menu.component';

describe('TrnMenuComponent', () => {
  let component: TrnMenuComponent;
  let fixture: ComponentFixture<TrnMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
