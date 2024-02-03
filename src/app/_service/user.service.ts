import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { User } from '../_model/user.interface';
import { AuthService } from '../auth.service';
import { Observable, firstValueFrom, map } from 'rxjs';
import { MyProfile } from '../_model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/users/`;
  userToken: string = '';

  public getUsers() {
    const headers = this.authService.getBearerToken();
    return this.http
      .get<any>(this.url, { headers })
      .pipe(map((response) => response.content));
  }

  public deleteUser(userId: number): Observable<any> {
    const headers = this.authService.getBearerToken();
    return this.http.delete(`${this.url}${userId}`, { headers });
  }

  public getMyProfile(): Promise<MyProfile> {
    const headers = this.authService.getBearerToken();
    console.log('Im a server. Im trying to get my-profile.');
    return firstValueFrom(
      this.http
        .get<MyProfile>(`${this.url}my-profile/`, { headers })
        .pipe(map((response) => response))
    );
  }
}
