import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { firstValueFrom, map } from 'rxjs';
import { Medication } from '../_model/medication.interface';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/medications/`;
  userToken: string = '';

  public addMedication(medication: Medication): Promise<Medication> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .post<Medication>(`${this.url}add`, medication, { headers })
        .pipe(map((response) => response))
    );
  }

  public getMedications(): Promise<Medication[]> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<Medication[]>(`${this.url}`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public updateMedication(medication: Medication): Promise<Medication> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .put<Medication>(`${this.url}`, medication, { headers })
        .pipe(map((response) => response))
    );
  }

  public deleteMedication(id: number) {
    const headers = this.authService.getBearerToken();
    return this.http.delete(`${this.url}${id}`, { headers });
  }
}
