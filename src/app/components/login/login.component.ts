import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  loginError: boolean = false;
  constructor(private authService: AuthService, private _router: Router) {}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.authService
        .login(this.formGroup.value)
        .pipe(
          catchError((error) => {
            if (error.status === 403) {
              console.log('POST 403 Forbidden');
              this.loginError = true;
            } else if (error.status === 401) {
              console.log('POST 401 Unauthorized');
            } else {
              alert('Wystąpił błąd: ' + error.message);
            }

            return EMPTY;
          })
        )
        .subscribe((result) => {
          // Obsługa poprawnej odpowiedzi
          if (result) {
            alert('Token zostal dodany do sessionStorage!');
            localStorage.clear();
            localStorage.setItem('jwtToken', 'Bearer ' + result.token); // Dodanie tokenu jwt do sesji
            this._router.navigate(['/home']);
          }
        });
    }
  }
}
