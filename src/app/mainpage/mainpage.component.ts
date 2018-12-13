import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'pipco-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  @ViewChild('video') video;
  private videoSource: string = "http://127.0.0.1:8002/videostream";

  constructor() { }

  ngOnInit() {
  }

  public onPlayRecording(file: File){
    this.video.onPlayRecording(file);
  }
}
