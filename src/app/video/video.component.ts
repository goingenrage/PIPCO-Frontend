import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pipco-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() srcUrl: string;
  private videoTitle: string = "IP Camera Live Stream.";

  constructor() { }

  ngOnInit() {
  }
}