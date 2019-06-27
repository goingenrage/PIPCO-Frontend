import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormularComponent } from './person-formular.component';

describe('PersonFormularComponent', () => {
  let component: PersonFormularComponent;
  let fixture: ComponentFixture<PersonFormularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFormularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
