import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { User } from '../_model/user';
import { AuthService } from '../auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/users/`;
  userToken: string = '';

  getUsers() {
    const token = this.authService.getToken();
    this.userToken = token !== null ? token : 'defaultRole';
    // Sprawdź czy token ma prefiks "Bearer", jeśli nie, dodaj go
    const finalToken = this.userToken.startsWith('Bearer ')
      ? this.userToken
      : `Bearer ${this.userToken}`;

    // Ustaw nagłówek z tokenem Bearer
    const headers = new HttpHeaders({
      Authorization: finalToken,
    });
    return this.http
      .get<any>(this.url, { headers })
      .pipe(map((response) => response.content));
  }
}
