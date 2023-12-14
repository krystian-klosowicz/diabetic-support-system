import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../environments/environment.development';
import { User } from '../../_model/user';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  responseData: any;
  users: User[] = [];
  private apiUrl = 'http://localhost:8080';
  userToken: string = '';
  displayedColumns: string[] = [
    'id',
    'role',
    'firstName',
    'lastName',
    'email',
    'pesel',
    'phoneNumber',
  ];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.takeData().subscribe((data) => {
      this.responseData = data;
    });
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  takeData(): Observable<any> {
    // Pobierz token z miejsca, gdzie jest przechowywany w twojej aplikacji
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

    // Wyślij żądanie HTTP typu GET z nagłówkiem
    return this.http.get(`${baseUrl}v1/users/`, { headers });
  }
}
