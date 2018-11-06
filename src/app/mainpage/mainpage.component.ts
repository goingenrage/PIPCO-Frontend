import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pipco-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  private videoSource: string = "https://en.ipcams.ch/getCamHandlerMjpg.aspx?nr=2954&rand=3935";

  constructor() { }

  ngOnInit() {
  }

}
