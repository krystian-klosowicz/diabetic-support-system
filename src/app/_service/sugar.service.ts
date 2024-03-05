import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { firstValueFrom, map } from 'rxjs';
import { SugarLevel } from '../_model';

@Injectable({
  providedIn: 'root',
})
export class SugarService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/sugars/`;
  userToken: string = '';

  public addMeasurement(sugarMeasurement: SugarLevel): Promise<SugarLevel> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .post<SugarLevel>(`${this.url}add`, sugarMeasurement, { headers })
        .pipe(map((response) => response))
    );
  }

  public getSugarLevels(): Promise<SugarLevel[]> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<SugarLevel[]>(`${this.url}`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public getSugarLevelsByUser(email: string): Promise<SugarLevel[]> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<SugarLevel[]>(`${this.url}get-by-user/${email}`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public updateMeasurement(sugarMeasurement: SugarLevel): Promise<SugarLevel> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .put<SugarLevel>(`${this.url}`, sugarMeasurement, { headers })
        .pipe(map((response) => response))
    );
  }

  public deleteMeasurement(id: number) {
    const headers = this.authService.getBearerToken();
    return this.http.delete(`${this.url}${id}`, { headers });
  }
}
