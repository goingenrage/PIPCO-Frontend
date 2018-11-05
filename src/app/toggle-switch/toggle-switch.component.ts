import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pipco-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css']
})
export class ToggleSwitchComponent implements OnInit {

  @Input() switchValue: boolean;

  constructor() { }

  ngOnInit() {
  }
}