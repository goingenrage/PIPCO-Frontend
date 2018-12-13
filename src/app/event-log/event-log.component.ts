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
export class EventLogComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private isEnabled: boolean = true;
  private eventLogEntries: EventLogEntry[];
  private nextEventLogPageToFetch: number = 0;
  private eventLogPageSize: number = 10;

  @Output() recording = new EventEmitter<File>();

  constructor(
    private eventService: EventService, 
    private domSanitizer: DomSanitizer,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.eventService.getEventLogEntries(this.nextEventLogPageToFetch++, this.eventLogPageSize).subscribe(result => {  
      this.eventLogEntries = result;
    }));
    this.subscriptions.push(this.settingsService.getSettings().subscribe(result => {
      this.isEnabled = result.log_enabled;
    }));
    this.subscriptions.push(interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.eventService.getEventLogEntries(0, this.eventLogPageSize))
      )
      .subscribe(result => {
        let newEventLogEntries: EventLogEntry[] = result.filter(entry => this.eventLogEntries.slice(0, result.length).find(element => element.id === entry.id) === undefined);
        this.eventLogEntries = newEventLogEntries.concat(this.eventLogEntries);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  public removeEventLogEntry(id: number): void {
    this.subscriptions.push(this.eventService.removeEventLogEntry(id).subscribe(result => {
      if (result["log_id"] == id) {
        this.eventLogEntries = this.eventLogEntries.filter(eventLogEntry => eventLogEntry.id != id);
      }
    }));
  }

  public onTableScroll(event: Event): void {
    if (event.target["offsetHeight"] + event.target["scrollTop"] >= event.target["scrollHeight"]) {
      this.subscriptions.push(this.eventService.getEventLogEntries(this.nextEventLogPageToFetch++, this.eventLogPageSize).subscribe(result => {  
        this.eventLogEntries = this.eventLogEntries.concat(result);
      }));
    }
  }

  public playRecording(filename: string){
    this.subscriptions.push(this.eventService.getRecording(filename).subscribe(result => {
        let file = new File([result], "recording.mp4", {type: "video/mp4", lastModified: Date.now()});
        this.recording.emit(file);
    }));
  }

  public onIsEnabledChange(isEnabled) {
    this.subscriptions.push(this.settingsService.changeSettings({"log_enabled": isEnabled}).subscribe(result => {
      this.isEnabled = result["log_enabled"];
    }));
  }
}