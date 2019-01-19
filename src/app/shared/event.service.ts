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

  /**
   * get a specific number of event logs from a specific position in the list of all event logs via backend api
   * @param pageNumber used to calculate the offset from the start of the list of all event logs (offset = pageNumber * batchSize)
   * @param batchSize the number of event logs to be fetched, used for offset calculation as well
   */
  getEventLogEntries(pageNumber: number, batchSize: number): Observable<EventLogEntry[]> {
    return this.http.get<EventLogEntry[]>(environment.backendAddress + "/logs/" + pageNumber + "/" + batchSize);
  }

  /**
   * remove an event log entry via backend api
   * @param id id of the event log entry to be removed
   */
  removeEventLogEntry(id: number): Observable<number> {
    return this.http.delete<number>(environment.backendAddress + "/log/" + id, environment.backendHttpOptions);
  }

  /**
   * get the file of a recorded clip via backend api
   * @param filename the name of the recorded clip to be fetched
   */
  getRecording(filename: string): Observable<Blob> {
    return this.http.get(environment.backendAddress + "/recording/" + encodeURI(filename), {
      responseType: 'blob'
    });
  }
}