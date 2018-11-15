import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pipco-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent implements OnInit {

  @Input() buttonText: string = "Button";
  @Input() textColor: string = "white";
  @Input() bgColor: string = "#4747c0";

  private buttonStyle: Object;

  constructor() { }

  ngOnInit() {
    this.buttonStyle = {
      "color": this.textColor,
      "background": this.bgColor
    }
  }

}
