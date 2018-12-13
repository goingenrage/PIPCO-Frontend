import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Settings } from './models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  public getSettings(): Observable<Settings> {
    return this.http.get(environment.backendAdress + "/config", environment.backendHttpOptions);
  }

  public changeSettings(newSettings: Settings): Observable<Settings> {
    return this.http.post(environment.backendAdress + "/config", newSettings, environment.backendHttpOptions);
  }

  public downloadBackup() {
    return this.http.get(environment.backendAdress + "/backup", {
      responseType: 'arraybuffer'
    });
  }
}
