import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  private notificationEmails: NotificationEmail[] = [];

  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.subscriptions.push(this.emailService.getNotificationEmails().subscribe(result => {
      this.notificationEmails = this.notificationEmails.concat(result);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  public toggleEmailNotifications(event: Event, notificationEmail: NotificationEmail): void {
    notificationEmail.notify = event.target["checked"];
    
    this.subscriptions.push(this.emailService.changeEmailNotificationStatus(notificationEmail.id).subscribe(result => {
      console.log("result: " + result);
    }))
  }

  public addEmail(event: Event): void {
    event.preventDefault();
    const newEmailAdress: string = event.target["email"].value;
    if (this.notificationEmails.find(notificationEmail => notificationEmail.address === newEmailAdress) === undefined) {
      this.notificationEmails.push({
        address: newEmailAdress,
        notify: true,
        id: 1
      });
    }
  }

  public removeEmail(emailAdress: NotificationEmail): void {
    this.notificationEmails = this.notificationEmails.filter(notificationEmail => notificationEmail != emailAdress);
  }
}