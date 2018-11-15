import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pipco-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() value: number;
  @Input() color1: string = "#1f437c";
  @Input() color2: string = "#c7c7c7";

  @Output() valueChange = new EventEmitter<number>();

  private sliderValue: number;
  private sliderBackgroundStyle: Object;

  constructor() { }

  ngOnInit() {
    this.sliderValue = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.updateSliderBackground();
  }

  private onSliderChanges() {
    this.value = ((this.sliderValue / 100) * (this.max - this.min)) + this.min;
    this.valueChange.emit(this.value);
    this.updateSliderBackground();
  }

  private updateSliderBackground() {
    const colorStopPos: number = this.sliderValue / 100;
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