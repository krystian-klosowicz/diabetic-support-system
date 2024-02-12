import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EMPTY } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FlexModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  loginError: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  public ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public loginProcess() {
    if (this.formGroup.valid) {
      this.authService
        .login(this.formGroup.value)
        .then((result) => {
          if (result) {
            alert('Token zostal dodany do sessionStorage!');
            localStorage.clear();
            localStorage.setItem('jwtToken', 'Bearer ' + result.token); // Dodanie tokenu jwt do sesji
            this.router.navigate(['/home']);
          }
        })
        .catch((error) => {
          if (error.status === 403) {
            console.log('POST 403 Forbidden');
            this.loginError = true;
          } else if (error.status === 401) {
            console.log('POST 401 Unauthorized');
          } else {
            alert('Wystąpił błąd: ' + error.message);
          }

          return EMPTY;
        });
    }
  }
}
