import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Settings } from '../shared/models/settings';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'pipco-video-settings',
  templateUrl: './video-settings.component.html',
  styleUrls: ['./video-settings.component.css']
})
/**
 * @param subscriptions an array of all subscriptions this component is or was subscribed to
 * @param settings all application settings that can be set via this component
 */
export class VideoSettingsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private settings: Settings;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.settingsService.getSettings().subscribe(result => {
      this.settings = result;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe());
  }

  /**
   * try to save an application setting via backend api
   * @param newSettings object containing the setting to be saved
   */
  changeSettings(newSettings: Settings): void {
    this.subscriptions.push(this.settingsService.changeSettings(newSettings).subscribe(result => {
      Object.keys(newSettings).forEach(key => {
        if (newSettings[key] === result[key]) {
          this.settings[key] = result[key];
        }
      })
    }));
    let videoplayer = <HTMLVideoElement> document.getElementById('videoStream');
    videoplayer.load();
  }
}
