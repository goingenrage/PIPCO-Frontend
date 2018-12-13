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
  private settings: Settings;
  private downloadingBackup: boolean = false;

  private statusObject: {
    streamUrlStatus: boolean,
    clipLengthStatus: boolean,
    clipCountStatus: boolean,
    clipStorageStatus: boolean
  };

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.statusObject = {
      streamUrlStatus: undefined,
      clipLengthStatus: undefined,
      clipCountStatus: undefined,
      clipStorageStatus: undefined
    };
    this.subscriptions.push(this.settingsService.getSettings().subscribe(result => {
      this.settings = result;
      this.statusObject = {
        streamUrlStatus: true,
        clipLengthStatus: true,
        clipCountStatus: true,
        clipStorageStatus: true
      };
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(entry => entry.unsubscribe);
  }

  onSettingsSave(newSettings: Settings, statusBoolName: string): void {
    this.statusObject[statusBoolName] = undefined;
    this.subscriptions.push(this.settingsService.changeSettings(newSettings).subscribe(result => {
      Object.keys(newSettings).forEach(key => {
        if (result[key] != undefined && newSettings[key] === result[key]) {
          this.statusObject[statusBoolName]= true;
          this.settings[key] = result[key];
        }
        else {         
          this.statusObject[statusBoolName] = false;
        }
      });
    }, error => this.statusObject[statusBoolName] = false));
  }

  returnToMainPage(): void {
    this.router.navigate(["main"]);
  }

  onSettingsChange(newSetting: any, settingName: string, statusBoolName: string): void {
    this.statusObject[statusBoolName] = this.settings[settingName].toString() === newSetting;
  }

  downloadBackup(): void {
    this.downloadingBackup = true;
    this.subscriptions.push(this.settingsService.downloadBackup().subscribe(result => {
      this.downloadingBackup = false;
      const resultBlob = new Blob([result], {
        type: 'application/zip'
      });
      const a: any = document.createElement('a');
      a.href = window.URL.createObjectURL(resultBlob);
      const now = new Date();
      a.download = "backup_" + now.getDate() + "_" + (now.getMonth() + 1) + "_" + now.getFullYear() + ".zip";
      a.click();
    }));
  }
}
