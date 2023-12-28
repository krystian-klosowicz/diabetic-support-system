import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environments/environment.development';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'jwtToken';
  private readonly role = 'role';

  constructor(
    private http: HttpClient,
    private _router: Router,
    private jwtHelper: JwtHelperService
  ) {}
  login(user: any): Observable<any> {
    console.log('Im a server. Im trying to login.');
    return this.http.post(`${baseUrl}v1/auth/authenticate/`, user);
  }

  register(user: any): Observable<any> {
    console.log('Im a server. Im trying to register.');
    return this.http.post(`${baseUrl}v1/auth/register/`, user);
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

  getBearerToken(): HttpHeaders {
    const token = this.getToken() || 'defaultRole';
    const finalToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    return new HttpHeaders({ Authorization: finalToken });
  }

  getRole(): string | null {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['role'];
    } else {
      return null;
    }
  }
}
