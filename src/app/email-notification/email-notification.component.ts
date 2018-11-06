import { Component, OnInit } from '@angular/core';
import { NotificationEmail } from '../shared/models/notification-email';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'pipco-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.css']
})
export class EmailNotificationComponent implements OnInit {

  private notificationEmails: NotificationEmail[];
  private isEnabled: boolean = true;

  constructor() { }

  ngOnInit() {
    this.notificationEmails = 
    [
      {
        emailAdress: "adress1",
        notify: true
      },{
        emailAdress: "adress2",
        notify: true
      },{
        emailAdress: "adress3",
        notify: true
      },{
        emailAdress: "adress4",
        notify: false
      },{
        emailAdress: "adress5",
        notify: true
      },{
        emailAdress: "adress6",
        notify: true
      },{
        emailAdress: "adress7",
        notify: false
      },{
        emailAdress: "adress8",
        notify: true
      },{
        emailAdress: "adress9",
        notify: false
      }
    ]
  }

  public toggleEmailNotifications(emailAdress: NotificationEmail): void {
    console.log(emailAdress.notify);
    emailAdress.notify = !emailAdress.notify;
    console.log(emailAdress.notify);
  }

  public addEmail(event: Event): void {
    event.preventDefault();
    const newEmailAdress: string = event.target["email"].value;
    if (this.notificationEmails.find(notificationEmail => notificationEmail.emailAdress === newEmailAdress) === undefined) {
      this.notificationEmails.push({
        emailAdress: newEmailAdress,
        notify: true
      });
    }
  }

  public removeEmail(emailAdress: NotificationEmail): void {
    this.notificationEmails = this.notificationEmails.filter(notificationEmail => notificationEmail != emailAdress);
  }
}
