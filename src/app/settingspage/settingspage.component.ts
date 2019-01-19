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
/**
 * @param subscriptions an array of all subscriptions this component is or was subscribed to
 * @param settings all application settings that can be set via this component
 * @param downloadingBackup used to display an animation when loading backup data
 * @param statusObject holding parameters to track the state of all changeable application settings in this component
 */
export class SettingspageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private settings: Settings;
  private downloadingBackup: boolean = false;

  /**
   * undefined - setting has yet to be loaded or is currently being saved
   * true - setting is saved
   * false - settings is not saved or could not be saved
   */
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

  /**
   * try to save an application setting via backend api and set the settings status bool according to the response
   * @param newSettings object containing the setting to be saved
   * @param statusBoolName name of the  statusObject parameter belonging to the setting to be saved
   */
  onSettingsSave(newSettings: Settings, statusBoolName: string): void {
    // display loading animation while communicating with backend
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

  /**
   * navigate to the main page
   */
  returnToMainPage(): void {
    this.router.navigate(["main"]);
  }

  /**
   * check if the newly entered value for a setting is equal to the saved value and set the settings status bool accordingly
   * @param newSetting newly entered value for the setting
   * @param settingName name of the settings parameter in the settings object
   * @param statusBoolName name of the settings status parameter in the status object
   */
  onSettingsChange(newSetting: any, settingName: string, statusBoolName: string): void {
    this.statusObject[statusBoolName] = this.settings[settingName].toString() === newSetting;
  }

  /**
   * trigger the download of a backend backup in zip format via backend api
   */
  downloadBackup(): void {
    this.downloadingBackup = true;

    this.subscriptions.push(this.settingsService.downloadBackup().subscribe(result => {
      this.downloadingBackup = false;
      const resultBlob = new Blob([result], {
        type: 'application/zip'
      });

      // create an a tag for downloading the backup file
      const a: any = document.createElement('a');
      a.href = window.URL.createObjectURL(resultBlob);
      // naming the backup file according to the current date
      const now = new Date();
      a.download = "backup_" + now.getDate() + "_" + (now.getMonth() + 1) + "_" + now.getFullYear() + ".zip";
      // trigger the download
      a.click();
    }));
  }
}
