import { Component, OnInit, Input } from '@angular/core';
import { EventLogEntry } from '../shared/models/event-log-entry';
import { EventService } from '../shared/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pipco-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css']
})
export class EventLogComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private isEnabled: boolean = false;
  private eventLogEntries: EventLogEntry[];
  private nextEventLogPageToFetch: number = 1;
  private eventLogPageSize: number = 10;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.subscriptions.push(this.eventService.getEventLogEntries(this.nextEventLogPageToFetch++, this.eventLogPageSize).subscribe(result => {  
      this.eventLogEntries = result;
    }));
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
      console.log("End");
      this.subscriptions.push(this.eventService.getEventLogEntries(this.nextEventLogPageToFetch++, this.eventLogPageSize).subscribe(result => {  
        this.eventLogEntries = this.eventLogEntries.concat(result);
      }));
    }
  }
}
