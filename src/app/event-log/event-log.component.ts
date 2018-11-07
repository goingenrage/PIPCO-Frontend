import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pipco-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css']
})
export class EventLogComponent implements OnInit {

  private isEnabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
