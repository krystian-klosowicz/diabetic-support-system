import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'jwtToken';

  constructor(private http: HttpClient, private _router: Router) {}
  login(user: any): Observable<any> {
    console.log('Im a server. Im trying to login.');
    return this.http.post(`${baseUrl}v1/auth/authenticate/`, user);
  }

  isLoggedIn(): boolean {
    // Sprawdź, czy token JWT jest dostępny w sesji
    return !!localStorage.getItem(this.tokenKey);
  }

  logoutUser() {
    localStorage.removeItem(this.tokenKey);
    this._router.navigate(['/login']);
  }

  getToken() {
    // Pobierz token JWT
    return localStorage.getItem(this.tokenKey);
  }
}
