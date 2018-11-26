import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventLogEntry } from './models/event-log-entry';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  public getEventLogEntries(pageNumber: number, batchSize: number): Observable<EventLogEntry[]> {
    return this.http.get<EventLogEntry[]>(environment.backendAdress + "/logs/" + pageNumber + "/" + batchSize);
  }

  public removeEventLogEntry(id: number): Observable<number> {
    return this.http.delete<number>(environment.backendAdress + "/log/" + id, environment.backendHttpOptions);
  }
}
