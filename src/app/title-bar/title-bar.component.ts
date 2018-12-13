import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pipco-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  @Input() title: boolean;
  @Input() isEnabled: boolean;
  @Output() isEnabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  isEnabledChanged(): void {
    this.isEnabledChange.emit(this.isEnabled);
  }
}