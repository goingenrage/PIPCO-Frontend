import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'pipco-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input() srcUrl: string;
  @ViewChild('video') video;
  private isPlayingClip = false;
  private videoTitle: string = "IP Camera Live Stream.";

  constructor() { }

  ngOnInit() {
  }

  startClip(file: File): void {    
    this.isPlayingClip = true;
    this.videoTitle = "Motion Detection Clip."
    this.video.nativeElement.innerHTML = '<source src="' + window.URL.createObjectURL(file) + '" type="video/mp4" >';
    this.video.nativeElement.load();
  }

  resumeLivestream(): void {
    this.isPlayingClip = false;
    this.videoTitle = "IP Camera Live Stream."
  }
}