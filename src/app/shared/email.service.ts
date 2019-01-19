import { Injectable } from '@angular/core';
import { NotificationEmail } from './models/notification-email';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * get all notification email objects via backend api
   */
  getNotificationEmails(): Observable<NotificationEmail[]> {
    return this.http.get<NotificationEmail[]>(environment.backendAddress + "/mails");
  }

  /**
   * toggle the notification status of an notification email via backend api
   * @param id id of the notification email thats notification status will be toggled
   */
  toggleEmailNotificationStatus(id: number): Observable<Object> {
    return this.http.put(environment.backendAddress + "/mail/" + id, environment.backendHttpOptions);
  }

  /**
   * add a new notification email via backend api
   * @param address the email address of the new notification email
   */
  addNewEmail(address: string): Observable<NotificationEmail> {
    return this.http.post<NotificationEmail>(environment.backendAddress + "/mail", {"mail": address}, environment.backendHttpOptions);
  }

  /**
   * remove a notification email via backend api
   * @param id id of the notification email thats will be removed
   */
  removeEmail(id: number): Observable<number> {
    return this.http.delete<number>(environment.backendAddress + "/mail/" + id, environment.backendHttpOptions);
  }
}
