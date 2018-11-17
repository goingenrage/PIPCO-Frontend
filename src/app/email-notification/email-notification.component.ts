import { Component, OnInit, Input } from '@angular/core';
import { NotificationEmail } from '../shared/models/notification-email';
import { EmailService } from '../shared/email.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pipco-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.css']
})
export class EmailNotificationComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private isEnabled: boolean = true;
  private notificationEmails: NotificationEmail[];

  constructor(private emailService: EmailService) { }

  ngOnInit() {

    this.subscriptions.push(this.emailService.getNotificationEmails().subscribe(result => {
      console.log(result);
    }));

    this.notificationEmails = 
    [
      {
        adress: "adress1@web.de",
        notify: true
      },{
        adress: "adress2@web.de",
        notify: true
      },{
        adress: "adress3@web.de",
        notify: true
      },{
        adress: "adress4@web.de",
        notify: false
      },{
        adress: "adress9@web.de",
        notify: false
      }
    ]
  }

  public toggleEmailNotifications(event: Event, emailAdress: NotificationEmail): void {
    emailAdress.notify = event.target["checked"];
  }

  public addEmail(event: Event): void {
    event.preventDefault();
    const newEmailAdress: string = event.target["email"].value;
    if (this.notificationEmails.find(notificationEmail => notificationEmail.adress === newEmailAdress) === undefined) {
      this.notificationEmails.push({
        adress: newEmailAdress,
        notify: true
      });
    }
  }

  public removeEmail(emailAdress: NotificationEmail): void {
    this.notificationEmails = this.notificationEmails.filter(notificationEmail => notificationEmail != emailAdress);
  }
}
