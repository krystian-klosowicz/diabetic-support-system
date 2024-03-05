import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { firstValueFrom, map } from 'rxjs';
import { InsulinDose } from '../_model/insulin-dose.interface';

@Injectable({
  providedIn: 'root',
})
export class InsulinDosesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/insulin-doses/`;
  userToken: string = '';

  public addInsulinDose(insulinDose: InsulinDose): Promise<InsulinDose> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .post<InsulinDose>(`${this.url}add`, insulinDose, { headers })
        .pipe(map((response) => response))
    );
  }

  public getInsulinDoses(): Promise<InsulinDose[]> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<InsulinDose[]>(`${this.url}`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public getInsulinDosesByUser(email: string): Promise<InsulinDose[]> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<InsulinDose[]>(`${this.url}get-by-user/${email}`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public updateInsulinDose(insulinDose: InsulinDose): Promise<InsulinDose> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .put<InsulinDose>(`${this.url}`, insulinDose, { headers })
        .pipe(map((response) => response))
    );
  }

  public deleteInsulinDose(id: number) {
    const headers = this.authService.getBearerToken();
    return this.http.delete(`${this.url}${id}`, { headers });
  }
}
