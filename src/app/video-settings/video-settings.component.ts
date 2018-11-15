import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pipco-video-settings',
  templateUrl: './video-settings.component.html',
  styleUrls: ['./video-settings.component.css']
})
export class VideoSettingsComponent implements OnInit {

  private sensitivityValue: number = 500;
  private contrastValue: number = 50;
  private brightnessValue: number = 50;

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log("sdaasdasd")
    console.log(this.sensitivityValue)
  }
}
