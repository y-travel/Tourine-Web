import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonUpsertComponent } from './person-upsert.component';

describe('PersonUpsertComponent', () => {
  let component: PersonUpsertComponent;
  let fixture: ComponentFixture<PersonUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
