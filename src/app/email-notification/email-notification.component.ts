import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationEmail } from '../shared/models/notification-email';
import { EmailService } from '../shared/email.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pipco-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.css']
})
export class EmailNotificationComponent implements OnInit, OnDestroy {

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

  public toggleEmailNotificationStatus(event: Event, notificationEmail: NotificationEmail): void {
    this.subscriptions.push(this.emailService.toggleEmailNotificationStatus(notificationEmail.id).subscribe(result => {
      notificationEmail.notify = result["notify"] === "True";
    }));
  }

  public addEmailAddress(event: Event): void {
    event.preventDefault();
    const newEmailAdress: string = event.target["emailAddressInput"].value;
    if (this.notificationEmails.find(notificationEmail => notificationEmail.address === newEmailAdress) === undefined) {
      this.subscriptions.push(this.emailService.addNewEmail(newEmailAdress).subscribe(result => {
        this.notificationEmails.push({
          address: newEmailAdress,
          id: result["mail_id"],
          notify: true
        });
      }));
    };
  }

  public removeEmail(id: number): void {
    this.subscriptions.push(this.emailService.removeEmail(id).subscribe(result => {
      this.notificationEmails = this.notificationEmails.filter(notificationEmail => notificationEmail.id != result["mail_id"]);
    }));
  }
}