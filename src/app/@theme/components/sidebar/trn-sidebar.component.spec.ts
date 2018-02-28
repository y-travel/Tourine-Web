import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnSidebarComponent } from './trn-sidebar.component';

describe('TrnSidebarComponent', () => {
  let component: TrnSidebarComponent;
  let fixture: ComponentFixture<TrnSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
