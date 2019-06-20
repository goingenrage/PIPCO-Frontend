import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationEmail } from '../shared/models/notification-email';
import { EmailService } from '../shared/email.service';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'pipco-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.css']
})
/**
 * @param subscriptions an array of all subscriptions this component is or was subscribed to
 * @param isEnabled global notification status which is bound to a toggle switch in the component
 * @param notificationEmails a list of all registered notification emails
 */
export class EmailNotificationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private isEnabled: boolean = true;
  private notificationEmails: NotificationEmail[] = [];

  constructor(
    private emailService: EmailService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.emailService.getNotificationEmails().subscribe(result => {
      this.notificationEmails = this.notificationEmails.concat(result);
    }));
    this.subscriptions.push(this.settingsService.getSettings().subscribe(result => {
      this.isEnabled = result["global_notify"];
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  /**
   * toggle the notification status of a notification mail
   * @param notificationEmail the email object which is having its notification status toggled
   */
  toggleEmailNotificationStatus(id: number): void {
    this.subscriptions.push(this.emailService.toggleEmailNotificationStatus(id).subscribe());
  }

  /** 
   * add a new email to the list of notification emails via backend api
   * @param event event that is created by submitting the form upon adding a new email address
   */
  addEmailAddress(event: Event): void {
    // prevent default event behaviour - page reload for example
    event.preventDefault();

    const newEmailAdress: string = event.target["emailAddressInput"].value;

    // return if the input email is not a valid email address
    const emailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailRegex.test(newEmailAdress)) {
      return;
    }

    // add the new email to the list if it is not already present
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

  /**
   * remove a mail address from the list of notification emails via backend api
   * @param id the id of the mail address that will be removed
   */
  removeEmail(id: number): void {
    this.subscriptions.push(this.emailService.removeEmail(id).subscribe(result => {
      this.notificationEmails = this.notificationEmails.filter(notificationEmail => notificationEmail.id != result["mail_id"]);
    }));
  }

  /**
   * change the global notification status via backend api
   * @param isEnabled the new global notification status value
   */
  onIsEnabledChange(isEnabled): void {
    this.subscriptions.push(this.settingsService.changeSettings({"global_notify": isEnabled}).subscribe(result => {
      this.isEnabled = result["global_notify"];
    }));
  }
}
