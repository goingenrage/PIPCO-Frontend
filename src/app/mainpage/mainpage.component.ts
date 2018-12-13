import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../shared/settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'pipco-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  @ViewChild('video') video;
  private videoSource: string = environment.backendAdress + "/videostream";

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() { }

  onPlayRecording(file: File): void {
    this.video.startClip(file);
  }
}