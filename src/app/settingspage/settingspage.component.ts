import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../shared/settings.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Settings } from '../shared/models/settings';

@Component({
  selector: 'pipco-settingspage',
  templateUrl: './settingspage.component.html',
  styleUrls: ['./settingspage.component.css']
})
export class SettingspageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public settings: Settings;

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.settingsService.getSettings().subscribe(result => {
      this.settings = result;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(entry => entry.unsubscribe);
  }

  public onSettingsChange(newSettings: Settings) {
    console.log(newSettings)
    this.subscriptions.push(this.settingsService.changeSettings(newSettings).subscribe(result => {
      Object.keys(newSettings).forEach(key => {
        if (newSettings[key] === result[key]) {
          this.settings[key] = result[key];
        }
      })
    }));
  }

  public returnToMainPage() {
    this.router.navigate(["main"]);
  }
}
