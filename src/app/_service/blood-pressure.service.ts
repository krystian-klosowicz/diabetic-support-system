import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { firstValueFrom, map } from 'rxjs';
import { BloodPressure } from '../_model/blood-pressure.interface';

@Injectable({
  providedIn: 'root',
})
export class BloodPressureService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/blood-pressures/`;
  userToken: string = '';

  public addBloodPressure(
    bloodPressure: BloodPressure
  ): Promise<BloodPressure> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .post<BloodPressure>(`${this.url}add`, bloodPressure, { headers })
        .pipe(map((response) => response))
    );
  }

  public getBloodPressures(): Promise<BloodPressure[]> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<BloodPressure[]>(`${this.url}`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public updateBloodPressure(
    bloodPressure: BloodPressure
  ): Promise<BloodPressure> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .put<BloodPressure>(`${this.url}`, bloodPressure, { headers })
        .pipe(map((response) => response))
    );
  }

  public deleteBloodPressure(id: number) {
    const headers = this.authService.getBearerToken();
    return this.http.delete(`${this.url}${id}`, { headers });
  }
}
