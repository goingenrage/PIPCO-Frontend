import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pipco-mode-selection',
  templateUrl: './mode-selection.component.html',
  styleUrls: ['./mode-selection.component.css']
})
export class ModeSelectionComponent implements OnInit {
  @Input() cam_mode: number = 0;
  @Output() modeChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
}