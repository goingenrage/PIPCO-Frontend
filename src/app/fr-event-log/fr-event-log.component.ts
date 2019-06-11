import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { EventLogEntry } from '../shared/models/event-log-entry';
import { EventLogEntryFr } from '../shared/models/event-log-entry-fr';
import { EventService } from '../shared/event.service';
import { Subscription, interval, Observable } from 'rxjs';
import { startWith, switchMap } from "rxjs/operators";
import { DomSanitizer } from '@angular/platform-browser';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'pipco-fr-event-log',
  templateUrl: './fr-event-log.component.html',
  styleUrls: ['./fr-event-log.component.css']
})
export class FrEventLogComponent implements OnInit {
  @Input() title_name: string = "";
  private subscriptions: Subscription[] = [];
  private isEnabled: boolean = true;
  private eventLogEntries: EventLogEntryFr[];
  private eventLogPageSize: number = 10;
  private nextEventLogPageToFetch: number = 0;
  @Output() recording = new EventEmitter<File>();

  constructor(
    private eventService: EventService,
    private domSanitizer: DomSanitizer,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.eventService.getEventLogEntriesFr(this.nextEventLogPageToFetch++, this.eventLogPageSize).subscribe(result => {  
      this.eventLogEntries = result;
    }));
    this.subscriptions.push(this.settingsService.getSettings().subscribe(result => {
      this.isEnabled = result.fr_log_enabled;
      const maxLogs: number = result.max_logs;

      // polling for newly created event logs
      this.subscriptions.push(interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.eventService.getEventLogEntriesFr(0, this.eventLogPageSize))
      )
      .subscribe(result => {
        // checking for new event logs
        let newEventLogEntries: EventLogEntryFr[] = result.filter(entry => this.eventLogEntries.slice(0, result.length).find(element => element.id === entry.id) === undefined);
        // adding all new event logs to the existing ones
        this.eventLogEntries = newEventLogEntries.concat(this.eventLogEntries);
        // if now there are more event logs than allowed, remove the oldest ones to match the allowed array size
        if(this.eventLogEntries.length > maxLogs) {
          this.eventLogEntries = this.eventLogEntries.slice(0, maxLogs);
        }
      }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  /**
   * remove an event log entry via backend api
   * @param id the id of the event log entry that will be removed
   */
  removeEventLogEntry(id: number): void {
    this.subscriptions.push(this.eventService.removeEventLogEntryFr(id).subscribe(result => {
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
      this.subscriptions.push(this.eventService.getEventLogEntriesFr(this.nextEventLogPageToFetch++, this.eventLogPageSize).subscribe(result => {  
        this.eventLogEntries = this.eventLogEntries.concat(result);
      }));
    }
  }

  /**
   * trigger a new event to be emitted for recording replay 
   * @param filename name of the recording file that will be played
   */
  playRecording(filename: string): void {
    this.subscriptions.push(this.eventService.getRecordingFr(filename).subscribe(result => {
        const file = new File([result], "recording.avi", {
          type: "video/avi", 
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
    this.subscriptions.push(this.settingsService.changeSettings({"fr_log_enabled": isEnabled}).subscribe(result => {
      this.isEnabled = result["fr_log_enabled"];
    }));
  }

}
