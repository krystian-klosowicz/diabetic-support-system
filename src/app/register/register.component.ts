import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  model: any = {
    role: 'PATIENT', // Ustawienie wartości domyślnej na 'DOCTOR'
  };
}
