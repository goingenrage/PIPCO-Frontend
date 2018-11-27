import { Component, OnInit, Input } from '@angular/core';
import { EventLogEntry } from '../shared/models/event-log-entry';
import { EventService } from '../shared/event.service';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from "rxjs/operators";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pipco-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css']
})
export class EventLogComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private isEnabled: boolean = false;
  private eventLogEntries: EventLogEntry[];
  private nextEventLogPageToFetch: number = 0;
  private eventLogPageSize: number = 10;

  constructor(private eventService: EventService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subscriptions.push(this.eventService.getEventLogEntries(this.nextEventLogPageToFetch++, this.eventLogPageSize).subscribe(result => {  
      this.eventLogEntries = result;
    }));

    interval(7000)
      .pipe(
        startWith(0),
        switchMap(() => this.eventService.getEventLogEntries(0, this.eventLogPageSize))
      )
      .subscribe(result => {
        let newEventLogEntries: EventLogEntry[] = result.filter(entry => this.eventLogEntries.slice(0, result.length).find(element => element.id === entry.id) === undefined);
        this.eventLogEntries = newEventLogEntries.concat(this.eventLogEntries);
      });
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
}
