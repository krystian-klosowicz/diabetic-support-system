import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Role } from '../../_model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //to jest inline interfejs
  model: { role: Role; pwzNumber?: string; diabetesType?: string } = {
    role: Role.ROLE_PATIENT,
  };

  formGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    //TODO:
    //to ma być ztypowane generyk
    //wszedzie gdzie FormGroup, FormControl <typ>
    this.formGroup = new FormGroup({
      role: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      pwzNumber: new FormControl('', []),
      diabetesType: new FormControl('', []),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      pesel: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    });

    // Dynamiczne dodawanie i usuwanie walidatorów w zależności od roli
    const pwzNumberControl = this.formGroup.get('pwzNumber');
    const diabetesTypeControl = this.formGroup.get('diabetesType');

    const roleControl = this.formGroup.get('role');

    if (roleControl) {
      roleControl.valueChanges.subscribe((role) => {
        pwzNumberControl?.clearValidators();
        diabetesTypeControl?.clearValidators();

        if (role === 'ROLE_DOCTOR') {
          pwzNumberControl?.setValidators([Validators.required]);
        } else if (role === 'ROLE_PATIENT') {
          diabetesTypeControl?.setValidators([Validators.required]);
        }

        pwzNumberControl?.updateValueAndValidity();
        diabetesTypeControl?.updateValueAndValidity();
      });
    }
  }

  registerProcess() {
    if (this.formGroup.valid) {
      this.authService
        .register(this.formGroup.value)
        .pipe(
          catchError((error) => {
            if (error.status === 403) {
              console.log('POST 403 Forbidden');
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
            alert('Użytkownik został zarejestrowany!');
            this.router.navigate(['/login']);
          }
        });
    }
  }
}
