import { Injectable } from '@angular/core';
import { NotificationEmail } from './models/notification-email';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Person } from '../shared/models/person';

@Injectable()
export class PersonService {

  constructor( private http: HttpClient ) { }
 /**
   * add a person object into the database using the REST interface
   * @param person person object, which should be created
   */
  addNewPerson(person : Person) : Observable<Person>{
    return this.http.post<Person>(environment.backendAddress + "/createperson", person, environment.backendHttpOptions);
  }
}