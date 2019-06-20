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
   * add a new notification email via backend api
   * @param address the email address of the new notification email
   */
  addNewPerson(fd : FormData) : Observable<FormData>{
    var httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data'
      })
    }; 
    return this.http.post<FormData>(environment.backendAddress + "/createperson", fd, httpOptions);
  }
}