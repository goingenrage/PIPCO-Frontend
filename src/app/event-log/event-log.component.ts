import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { EventLogEntry } from '../shared/models/event-log-entry';
import { EventService } from '../shared/event.service';
import { Subscription, interval, Observable } from 'rxjs';
import { startWith, switchMap } from "rxjs/operators";
import { DomSanitizer } from '@angular/platform-browser';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'pipco-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css']
})
/**
 * @param subscriptions an array of all subscriptions this component is subscribed to
 * @param isEnabled motion detection enabledness status which is bound to a toggle switch in the component
 * @param eventLogEntries a list of all displayed event logs
 * @param eventLogPageSize the number of event log entries that are fetched with each request at backend api
 * @param nextEventLogPageToFetch the next batch number of event log entries to be fetched
 * @param recording used to create events for transmitting recordings over multiple components
 */
export class EventLogComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private isEnabled: boolean = true;
  private eventLogEntries: EventLogEntry[];
  private eventLogPageSize: number = 10;
  private nextEventLogPageToFetch: number = 0;
  @Output() recording = new EventEmitter<File>();

  constructor(
    private eventService: EventService,
    private domSanitizer: DomSanitizer,
    private settingsService: SettingsService
  ) { }

  /**
   * get necessary data upon initialization
   */
  ngOnInit() {
    this.subscriptions.push(this.eventService.getEventLogEntries(this.nextEventLogPageToFetch++, this.eventLogPageSize).subscribe(result => {  
      this.eventLogEntries = result;
    }));
    this.subscriptions.push(this.settingsService.getSettings().subscribe(result => {
      this.isEnabled = result.log_enabled;
      const maxLogs: number = result.max_logs;

      // polling for newly created event logs
      this.subscriptions.push(interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.eventService.getEventLogEntries(0, this.eventLogPageSize))
      )
      .subscribe(result => {
        // checking for new event logs
        let newEventLogEntries: EventLogEntry[] = result.filter(entry => this.eventLogEntries.slice(0, result.length).find(element => element.id === entry.id) === undefined);
        // adding all new event logs to the existing ones
        this.eventLogEntries = newEventLogEntries.concat(this.eventLogEntries);
        // if now there are more event logs than allowed, remove the oldest ones to match the allowed array size
        if(this.eventLogEntries.length > maxLogs) {
          this.eventLogEntries = this.eventLogEntries.slice(0, maxLogs);
        }
      }));
    }));
  }

  /**
   * unsubscribe from all remaining subscriptions upon component destruction
   */
  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  /**
   * remove an event log entry via backend api
   * @param id the id of the event log entry that will be removed
   */
  removeEventLogEntry(id: number): void {
    this.subscriptions.push(this.eventService.removeEventLogEntry(id).subscribe(result => {
      if (result["log_id"] == id) {
        this.eventLogEntries = this.eventLogEntries.filter(eventLogEntry => eventLogEntry.id != id);
      }
    }));
  }

  /**
   * fetch new event log entries upon scrolling to the bottom of the list of event logs
   * @param event scroll event that is created on scrolling
   */
  onTableScroll(event: Event): void {
    if (event.target["offsetHeight"] + event.target["scrollTop"] >= event.target["scrollHeight"]) {
      this.subscriptions.push(this.eventService.getEventLogEntries(this.nextEventLogPageToFetch++, this.eventLogPageSize).subscribe(result => {  
        this.eventLogEntries = this.eventLogEntries.concat(result);
      }));
    }
  }

  /**
   * trigger a new event to be emitted for recording replay 
   * @param filename name of the recording file that will be played
   */
  playRecording(filename: string): void {
    this.subscriptions.push(this.eventService.getRecording(filename).subscribe(result => {
        const file = new File([result], "recording.mp4", {
          type: "video/mp4", 
          lastModified: Date.now()
        });
        this.recording.emit(file);
    }));
  }

  /**
   * change the motion detection enabledness status via backend api
   * @param isEnabled new motion detection enabledness status
   */
  onIsEnabledChange(isEnabled): void {
    this.subscriptions.push(this.settingsService.changeSettings({"log_enabled": isEnabled}).subscribe(result => {
      this.isEnabled = result["log_enabled"];
    }));
  }
}