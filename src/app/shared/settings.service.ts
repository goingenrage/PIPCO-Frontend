import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Settings } from './models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * get all application settings via backend api
   */
  getSettings(): Observable<Settings> {
    return this.http.get(environment.backendAddress + "/config", environment.backendHttpOptions);
  }

  /**
   * change application settings via backend api
   * @param newSettings new setting values to be saved
   */
  changeSettings(newSettings: Settings): Observable<Settings> {
    return this.http.post(environment.backendAddress + "/config", newSettings, environment.backendHttpOptions);
  }

  /**
   * download a backend backup via backend api
   */
  downloadBackup(): Observable<ArrayBuffer> {
    return this.http.get(environment.backendAddress + "/backup", {
      responseType: 'arraybuffer'
    });
  }
}
