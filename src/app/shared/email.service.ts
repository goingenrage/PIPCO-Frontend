import { Injectable } from '@angular/core';
import { NotificationEmail } from './models/notification-email';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  public getNotificationEmails(): Observable<NotificationEmail[]> {
    return this.http.get<NotificationEmail[]>(environment.backendAdress + "/mails");
  }

  public toggleEmailNotificationStatus(emailId: number): Observable<object> {
    return this.http.put(environment.backendAdress + "/mail/" + emailId, environment.backendHttpOptions);
  }

  public addNewEmail(address: string): Observable<NotificationEmail> {
    return this.http.post<NotificationEmail>(environment.backendAdress + "/mail", {"mail": address}, environment.backendHttpOptions);
  }
}
