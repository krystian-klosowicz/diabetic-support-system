import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { User } from '../_model/user';
import { AuthService } from '../auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/users/`;
  userToken: string = '';

  getUsers() {
    const headers = this.authService.getBearerToken();
    return this.http
      .get<any>(this.url, { headers })
      .pipe(map((response) => response.content));
  }

  deleteUser(userId: number): Observable<any> {
    const headers = this.authService.getBearerToken();
    return this.http.delete(`${this.url}${userId}`, { headers });
  }
}
