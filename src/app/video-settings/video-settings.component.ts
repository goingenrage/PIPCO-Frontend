import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../shared/settings.service';
import { Subscription } from 'rxjs';
import { Settings } from '../shared/models/settings';

@Component({
  selector: 'pipco-video-settings',
  templateUrl: './video-settings.component.html',
  styleUrls: ['./video-settings.component.css']
})
export class VideoSettingsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  private settings: Settings;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.subscriptions.push(this.settingsService.getSettings().subscribe(result => {
      this.settings = result;
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  public onSettingsChange(newSettings: Settings) {
    this.subscriptions.push(this.settingsService.changeSettings(newSettings).subscribe(result => {
      Object.keys(newSettings).forEach(key => {
        if (newSettings[key] === result[key]) {
          this.settings[key] = result[key];
        }
      })
    }));
  }
}
