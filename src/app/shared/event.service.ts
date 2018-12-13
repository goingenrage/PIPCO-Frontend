import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventLogEntry } from './models/event-log-entry';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getEventLogEntries(pageNumber: number, batchSize: number): Observable<EventLogEntry[]> {
    return this.http.get<EventLogEntry[]>(environment.backendAdress + "/logs/" + pageNumber + "/" + batchSize);
  }

  removeEventLogEntry(id: number): Observable<number> {
    return this.http.delete<number>(environment.backendAdress + "/log/" + id, environment.backendHttpOptions);
  }

  getRecording(filename: string): Observable<Blob> {
    return this.http.get(environment.backendAdress + "/recording/" + encodeURI(filename), {
      responseType: 'blob'
    });
  }
}