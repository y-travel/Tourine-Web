import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellToolbarComponent } from './cell-toolbar.component';

describe('CellToolbarComponent', () => {
  let component: CellToolbarComponent;
  let fixture: ComponentFixture<CellToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
