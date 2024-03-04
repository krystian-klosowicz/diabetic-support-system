import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environment.development';
import { AuthService } from '../auth.service';
import { firstValueFrom, map } from 'rxjs';
import { MyProfile } from '../_model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = `${baseUrl}v1/users/`;
  userToken: string = '';

  public getPatientsAssignedToDoctor(): Promise<MyProfile[]> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<MyProfile[]>(`${this.url}assigned-to-doctor`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public getPatientsNotAssignedToDoctor(): Promise<MyProfile[]> {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .get<MyProfile[]>(`${this.url}not-assigned-to-doctor`, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public assignToDoctor(myProfile: MyProfile) {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .put(`${this.url}assign-to-doctor`, myProfile, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  public unAssignPatient(myProfile: MyProfile) {
    const headers = this.authService.getBearerToken();
    return firstValueFrom(
      this.http
        .put(`${this.url}un-assign-patient`, myProfile, {
          headers,
        })
        .pipe(map((response) => response))
    );
  }

  //   public getUsers() {
  //     const headers = this.authService.getBearerToken();
  //     return this.http
  //       .get<any>(this.url, { headers })
  //       .pipe(map((response) => response.content));
  //   }

  //   public updateUser(profile: MyProfile): Promise<MyProfile> {
  //     const headers = this.authService.getBearerToken();
  //     console.log('Im a server. Im trying to update my profile.');
  //     console.log(profile);
  //     return firstValueFrom(
  //       this.http
  //         .put<MyProfile>(this.url, profile, { headers })
  //         .pipe(map((response) => response))
  //     );
  //   }

  //   public updateAddress(address: Address): Promise<MyProfile> {
  //     const headers = this.authService.getBearerToken();
  //     console.log('Im a server. Im trying to update my profile.');
  //     console.log(address);
  //     return firstValueFrom(
  //       this.http
  //         .put<MyProfile>(`${this.url}update-address/`, address, { headers })
  //         .pipe(map((response) => response))
  //     );
  //   }

  //   public changeAcoountStatus(userId: number) {
  //     const headers = this.authService.getBearerToken();
  //     console.log('Im a server. Im trying to change account status.');
  //     return firstValueFrom(
  //       this.http
  //         .put(`${this.url}change-account-status/${userId}`, {}, { headers })
  //         .pipe(map((response) => response))
  //     );
  //   }

  //   public resetPassword(userId: number) {
  //     const headers = this.authService.getBearerToken();
  //     console.log('Im a server. Im trying to reset user password.');
  //     return firstValueFrom(
  //       this.http
  //         .put(`${this.url}reset-password/${userId}`, {}, { headers })
  //         .pipe(map((response) => response))
  //     );
  //   }

  //   public changePassword(password: Password) {
  //     const headers = this.authService.getBearerToken();
  //     console.log('Im a server. Im trying to change password.');
  //     return firstValueFrom(
  //       this.http
  //         .put<MyProfile>(`${this.url}change-password/`, password, { headers })
  //         .pipe(map((response) => response))
  //     );
  //   }

  //   public deleteUser(userId: number): Observable<any> {
  //     const headers = this.authService.getBearerToken();
  //     return this.http.delete(`${this.url}${userId}`, { headers });
  //   }

  //   public getMyProfile(): Promise<MyProfile> {
  //     const headers = this.authService.getBearerToken();
  //     console.log('Im a server. Im trying to get my-profile.');
  //     return firstValueFrom(
  //       this.http
  //         .get<MyProfile>(`${this.url}my-profile/`, { headers })
  //         .pipe(map((response) => response))
  //     );
  //   }
}
