import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: false,
  backendAdress: "http://127.0.0.1:8002",
  backendHttpOptions: {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }
};