import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrhSidebarComponent } from './trh-sidebar.component';

describe('TrhSidebarComponent', () => {
  let component: TrhSidebarComponent;
  let fixture: ComponentFixture<TrhSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrhSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrhSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
