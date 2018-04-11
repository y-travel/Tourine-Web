import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberUpsertComponent } from './team-member-upsert.component';

describe('TeamMemberUpsertComponent', () => {
  let component: TeamMemberUpsertComponent;
  let fixture: ComponentFixture<TeamMemberUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
