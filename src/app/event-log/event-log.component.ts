import { Component, OnInit, Input } from '@angular/core';
import { EventLogEntry } from '../shared/models/event-log-entry';

@Component({
  selector: 'pipco-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css']
})
export class EventLogComponent implements OnInit {

  private isEnabled: boolean = false;
  private eventLogEntries: EventLogEntry[];

  constructor() { }

  ngOnInit() {
    this.eventLogEntries = 
    [
      {
        thumbnailSrc: "assets/img/example_thumbnail.jpg",
        timestamp: new Date(),
        message: "Event 1"
      },{
        thumbnailSrc: "assets/img/example_thumbnail.jpg",
        timestamp: new Date(),
        message: "Event 2"
      },{
        thumbnailSrc: "assets/img/example_thumbnail.jpg",
        timestamp: new Date(),
        message: "Event 3"
      },{
        thumbnailSrc: "assets/img/example_thumbnail.jpg",
        timestamp: new Date(),
        message: "Event 4"
      },{
        thumbnailSrc: "assets/img/example_thumbnail.jpg",
        timestamp: new Date(),
        message: "Event 5"
      },{
        thumbnailSrc: "assets/img/example_thumbnail.jpg",
        timestamp: new Date(),
        message: "Event 6"
      },{
        thumbnailSrc: "assets/img/example_thumbnail.jpg",
        timestamp: new Date(),
        message: "Testmessage"
      },{
        thumbnailSrc: "assets/img/example_thumbnail.jpg",
        timestamp: new Date(),
        message: "Event 7"
      },{
        thumbnailSrc: "assets/img/example_thumbnail.jpg",
        timestamp: new Date(),
        message: "Event 8"
      }
    ]
  }

  public removeEventLogEntry(eventLogEntryToRemove: EventLogEntry): void {
    this.eventLogEntries = this.eventLogEntries.filter(eventLogEntry => eventLogEntry != eventLogEntryToRemove);
  }
}
