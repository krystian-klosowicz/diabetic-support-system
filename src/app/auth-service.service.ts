import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> {
    console.log('Im a server');
    return this.http.post(`${baseUrl}v1/auth/authenticate/`, data);
  }
}
