import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pipco-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
/**
 * @param min minimum slider value 
 * @param max maximum slider value
 * @param value current slider value
 * @param step slider step size
 * @param color1 slider background color
 * @param color2 slider foreground color
 * @param valueChange event emitter for value change notifications
 * @param sliderBackgroundStyle style object to change slider colors on value change
 */
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

  /**
   * this method is called when the slider value changes
   */
  private onSliderChanges(): void {
    this.valueChange.emit(this.value);
    this.updateSliderBackground();
  }

  /**
   * adjust slider style object values to fit the current slider value
   */
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