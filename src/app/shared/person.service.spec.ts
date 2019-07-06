import { TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';
import { HttpClientModule } from '@angular/common/http';

describe('PersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({ 
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: PersonService = TestBed.get(PersonService);
    expect(service).toBeTruthy();
  });
});
