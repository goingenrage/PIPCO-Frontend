import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pipco-directional-pad',
  templateUrl: './directional-pad.component.html',
  styleUrls: ['./directional-pad.component.css']
})
export class DirectionalPadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public clickedDirection(direction: string) {
    console.log("clicked direction: " + direction);
  }
}
