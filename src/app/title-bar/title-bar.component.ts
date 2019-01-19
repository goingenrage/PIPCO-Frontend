import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pipco-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
/**
 * @param title displayed title text
 * @param isEnabled toggle switch status value
 * @param isEnabledChange event emitter for toggle switch value change notifications
 */
export class TitleBarComponent implements OnInit {
  @Input() title: boolean;
  @Input() isEnabled: boolean;
  @Output() isEnabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * emit an event to notify about toggle switch value changes
   */
  isEnabledChanged(): void {
    this.isEnabledChange.emit(this.isEnabled);
  }
}