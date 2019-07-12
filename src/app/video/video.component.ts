import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'pipco-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
/**
 * @param srcUrl video stream source url
 * @param video view child element
 * @param isPlayingClip used to toggle live stream visibility when playing a clip / resuming to livestream
 * @param videoTitle displayed livestream or clip title
 */
export class VideoComponent implements OnInit {
  @Input() srcUrl: string;
  @ViewChild('video') video;
  public isPlayingClip: boolean = false;
  public videoTitle: string = "IP Camera Live Stream.";

  constructor() { }

  ngOnInit() {
  }

  /**
   * replace the live stream video player with a clip playback
   * @param file clip file that will be played
   */
  startClip(file: File): void {    
    this.isPlayingClip = true;
    this.videoTitle = "Motion Detection Clip."
    this.video.nativeElement.innerHTML = '<source src="' + window.URL.createObjectURL(file) + '" type="video/mp4" >';
    this.video.nativeElement.load();
  }

  /**
   * change the visibility of the live stream video player to visible and reset the video title
   */
  resumeLivestream(): void {
    this.isPlayingClip = false;
    this.videoTitle = "IP Camera Live Stream."
  }
}