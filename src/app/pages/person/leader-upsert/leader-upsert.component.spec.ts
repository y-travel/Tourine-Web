import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderUpsertComponent } from './leader-upsert.component';

describe('LeaderUpsertComponent', () => {
  let component: LeaderUpsertComponent;
  let fixture: ComponentFixture<LeaderUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
