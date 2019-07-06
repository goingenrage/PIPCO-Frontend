import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PersonFormularComponent } from './person-formular.component';
import { PersonService } from '../shared/person.service';
import { HttpClientModule } from '@angular/common/http';

describe('PersonFormularComponent', () => {
  let component: PersonFormularComponent;
  let fixture: ComponentFixture<PersonFormularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
    ],
      declarations: [ PersonFormularComponent ],
      providers: [PersonService]
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
