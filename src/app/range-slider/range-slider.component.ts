import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pipco-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit {
  @Input() min: number = 0;
  @Input() max: number = 10;
  @Input() value: number = 50;
  @Input() step: number = 1;
  @Input() color1: string = "#1f437c";
  @Input() color2: string = "#c7c7c7";
  @Output() valueChange = new EventEmitter<number>();
  private sliderBackgroundStyle: Object;

  constructor() { }

  ngOnInit() {
    this.updateSliderBackground();
  }

  private onSliderChanges(): void {
    this.valueChange.emit(this.value);
    this.updateSliderBackground();
  }

  private updateSliderBackground(): void {
    const colorStopPos: number = (this.value - this.min) / (this.max - this.min);
    this.sliderBackgroundStyle = {
      "background-image": "-webkit-gradient(" +
        "linear," +
        "left top," +
        "right top," +
        "color-stop("+ colorStopPos + ", " + this.color1 + ")," +
        "color-stop(" + colorStopPos + ", " + this.color2 + ")"
    }
  }
}