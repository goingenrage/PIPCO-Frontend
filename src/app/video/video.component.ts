import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'pipco-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() srcUrl: string;
  @ViewChild('video') video;

  private recording = false;
  private videoTitle: string = "IP Camera Live Stream.";

  constructor() { }

  ngOnInit() {
  }

  public onPlayRecording(file: File){    
    this.recording = true;
    this.videoTitle = "Replay Recording."
    this.video.nativeElement.innerHTML = '<source src="' + window.URL.createObjectURL(file) + '" type="video/mp4" >';
    this.video.nativeElement.load();
  }

  public onResumeLivestream(){
    this.recording = false;
    this.videoTitle = "IP Camera Live Stream."
  }
}