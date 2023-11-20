import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { EMPTY, catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private authService: AuthServiceService) {}
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
              //alert('Błąd 403: Brak dostępu. Sprawdź swoje dane logowania.');
            } else {
              alert('Wystąpił błąd: ' + error.message);
            }

            return EMPTY;
          })
        )
        .subscribe((result) => {
          // Obsługa poprawnej odpowiedzi
          if (result) {
            alert(JSON.stringify(result));
          } else {
            alert('Pusta odpowiedź.');
          }
        });
    }
  }
}
