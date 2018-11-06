import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pipco-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  @Input() title: boolean;
  @Input() isEnabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
