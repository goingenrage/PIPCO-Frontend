import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../shared/settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'pipco-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
/**
 * @param video the child video component
 * @param videoSource video stream address
 */
export class MainpageComponent implements OnInit {
  @ViewChild('video') video;
  private videoSource: string = environment.backendAddress + "/videostream";

  constructor() { }

  ngOnInit() { }

  /**
   * play a recording via viewchild video component
   * @param file the file of the recording that will be played
   */
  onPlayRecording(file: File): void {
    this.video.startClip(file);
  }
}