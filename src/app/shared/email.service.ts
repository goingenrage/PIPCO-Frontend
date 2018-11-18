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

  public changeEmailNotificationStatus(emailId: number): Observable<boolean> {
    return this.http.put<boolean>(environment.backendAdress + "/mails/" + emailId, "void", environment.backendHttpOptions);
  }
}
