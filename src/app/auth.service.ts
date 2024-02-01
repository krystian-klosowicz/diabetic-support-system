import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { baseUrl } from '../environments/environment.development';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from './_model';

//klepie interfejs
interface LoginResponse {
  id: number;
  token: string;
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'jwtToken';
  private readonly role = 'role';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}
  public login(user: any): Promise<LoginResponse> {
    console.log('Im a server. Im trying to login.');
    return firstValueFrom(
      this.http.post<LoginResponse>(`${baseUrl}v1/auth/authenticate/`, user)
    );
  }

  public register(user: any): Promise<LoginResponse> {
    console.log('Im a server. Im trying to register.');
    return firstValueFrom(
      this.http.post<LoginResponse>(`${baseUrl}v1/auth/register/`, user)
    );
  }

  // Sprawdź, czy token JWT jest dostępny w sesji
  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  public logoutUser() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Pobierz token JWT
  private getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  public getBearerToken(): HttpHeaders {
    const token = this.getToken() || 'defaultRole';
    const finalToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    return new HttpHeaders({ Authorization: finalToken });
  }

  public getRole(): string | null {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['role'];
    } else {
      return null;
    }
  }

  public getUserId(): string | null {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['userId'];
    } else {
      return null;
    }
  }
}
