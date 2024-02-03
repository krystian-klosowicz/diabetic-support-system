import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { MyProfile } from '../../_model';
import { UserService } from '../../_service/user.service';
import { EMPTY } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class MyProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  userId: string | null = '';
  user: MyProfile | undefined;
  matItem: string | null = '1';
  isEditMode: boolean = false;
  profileForm: FormGroup;

  public ngOnInit() {
    this.initializeForm();
    this.loadMyProfile();
  }

  public setMatItem(itemNumber: string) {
    this.matItem = itemNumber;
    this.isEditMode = false;
  }

  public toggleEditMode() {
    this.profileForm = this.fb.group({
      email: [{ value: this.user?.email, disabled: true }],
      firstName: [
        { value: this.user?.firstName, disabled: !this.isEditMode },
        Validators.required,
      ],
      lastName: [
        { value: this.user?.lastName, disabled: !this.isEditMode },
        Validators.required,
      ],
      pesel: [{ value: this.user?.pesel, disabled: !this.isEditMode }],
      phoneNumber: [
        { value: this.user?.phoneNumber, disabled: !this.isEditMode },
      ],
      diabetesType: [
        { value: this.user?.diabetesType, disabled: !this.isEditMode },
      ],
      pwzNumber: [{ value: this.user?.pwzNumber, disabled: !this.isEditMode }],
    });
    this.isEditMode = !this.isEditMode;
  }

  public toggleSave() {
    if (!this.isEditMode) {
      this.loadMyProfile();
      this.profileForm = this.fb.group({
        email: [{ value: this.user?.email, disabled: true }],
        firstName: [
          { value: this.user?.firstName, disabled: !this.isEditMode },
          Validators.required,
        ],
        lastName: [
          { value: this.user?.lastName, disabled: !this.isEditMode },
          Validators.required,
        ],
        pesel: [{ value: this.user?.pesel, disabled: !this.isEditMode }],
        phoneNumber: [
          { value: this.user?.phoneNumber, disabled: !this.isEditMode },
        ],
        diabetesType: [
          { value: this.user?.diabetesType, disabled: !this.isEditMode },
        ],
        pwzNumber: [
          { value: this.user?.pwzNumber, disabled: !this.isEditMode },
        ],
      });
      this.isEditMode = false;
      alert('Saved.');
    }
  }

  public loadMyProfile() {
    this.userService
      .getMyProfile()
      .then((result) => {
        if (result) {
          this.user = result;
          this.profileForm.patchValue({
            email: this.user?.email || '',
            firstName: this.user?.firstName || '',
            lastName: this.user?.lastName || '',
            pesel: this.user?.pesel || '',
            phoneNumber: this.user?.phoneNumber || '',
            diabetesType: this.user?.diabetesType || '',
            pwzNumber: this.user?.pwzNumber || '',
          });
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          console.log('POST 403 Forbidden');
        } else if (error.status === 401) {
          console.log('POST 401 Unauthorized');
        } else {
          alert('Wystąpił błąd: ' + error.message);
        }

        return EMPTY;
      });
  }

  private initializeForm() {
    this.profileForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      pesel: [{ value: '', disabled: true }],
      phoneNumber: [{ value: '', disabled: true }],
      diabetesType: [{ value: '', disabled: true }],
      pwzNumber: [{ value: '', disabled: true }],
    });
  }
}
