import { HttpHeaders } from '@angular/common/http';

/**
 * @param production application build parameter
 * @param backendAddress backend api base address
 * @param backendHttpOptions backend api call http options
 */
export const environment = {
  production: false,
  backendAddress: "http://127.0.0.1:8002",
  backendHttpOptions: {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }
};