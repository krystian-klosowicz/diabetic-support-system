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
import { MyProfile, Role } from '../../_model';
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
  constructor(private userService: UserService, private fb: FormBuilder) {}

  user: MyProfile | undefined;
  matItem: string | null = '1';
  isEditMode: boolean = false;
  profileForm: FormGroup;
  addressForm: FormGroup;
  doctorForm: FormGroup;
  public Role = Role; // Expose the enum to the template

  public ngOnInit() {
    this.initializeForm(); // najpierw inicjuje czyste formsy
    this.loadMyProfile(); //pozniej sciagam dane i wczytuje w nim form
  }

  public setMatItem(itemNumber: string) {
    this.matItem = itemNumber;
    this.isEditMode = false;
    this.loadForm();
  }

  private initializeForm() {
    this.profileForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      pesel: [{ value: '', disabled: true }, Validators.required],
      phoneNumber: [{ value: '', disabled: true }, Validators.required],
      diabetesType: [{ value: '', disabled: true }],
      pwzNumber: [{ value: '', disabled: true }],
    });

    this.addressForm = this.fb.group({
      city: [{ value: '', disabled: true }, Validators.required],
      postalCode: [{ value: '', disabled: true }, Validators.required],
      street: [{ value: '', disabled: true }, Validators.required],
      houseNumber: [{ value: '', disabled: true }, Validators.required],
    });

    this.doctorForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      phoneNumber: [{ value: '', disabled: true }],
      pwzNumber: [{ value: '', disabled: true }],
    });
  }

  public loadMyProfile() {
    this.userService
      .getMyProfile()
      .then((result) => {
        if (result) {
          this.user = result;
          this.loadForm();
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

  public toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    switch (this.matItem) {
      case '1': {
        this.editProfileForm();
        break;
      }
      case '2': {
        this.editAddressForm();
        break;
      }
    }
  }

  private loadForm() {
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
      pesel: [
        { value: this.user?.pesel, disabled: !this.isEditMode },
        Validators.required,
      ],
      phoneNumber: [
        { value: this.user?.phoneNumber, disabled: !this.isEditMode },
        Validators.required,
      ],
      diabetesType: [
        { value: this.user?.diabetesType, disabled: !this.isEditMode },
      ],
      pwzNumber: [{ value: this.user?.pwzNumber, disabled: !this.isEditMode }],
    });
    this.addressForm = this.fb.group({
      city: [{ value: this.user?.address.city, disabled: !this.isEditMode }],
      postalCode: [
        { value: this.user?.address.postalCode, disabled: !this.isEditMode },
      ],
      street: [
        { value: this.user?.address.street, disabled: !this.isEditMode },
      ],
      houseNumber: [
        { value: this.user?.address.houseNumber, disabled: !this.isEditMode },
      ],
    });
    this.doctorForm = this.fb.group({
      email: [{ value: this.user?.assignedDoctor?.email, disabled: true }],
      firstName: [
        { value: this.user?.assignedDoctor?.firstName, disabled: true },
      ],
      lastName: [
        { value: this.user?.assignedDoctor?.lastName, disabled: true },
      ],
      phoneNumber: [
        { value: this.user?.assignedDoctor?.phoneNumber, disabled: true },
      ],
      pwzNumber: [
        { value: this.user?.assignedDoctor?.pwzNumber, disabled: true },
      ],
    });
  }

  private editProfileForm() {
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
  }

  private editAddressForm() {
    this.addressForm = this.fb.group({
      city: [{ value: this.user?.address.city, disabled: !this.isEditMode }],
      postalCode: [
        { value: this.user?.address.postalCode, disabled: !this.isEditMode },
      ],
      street: [
        { value: this.user?.address.street, disabled: !this.isEditMode },
      ],
      houseNumber: [
        { value: this.user?.address.houseNumber, disabled: !this.isEditMode },
      ],
    });
  }

  public toggleSave() {
    if (this.isEditMode) {
      if (this.profileForm.valid) {
        this.userService
          .updateUser(this.profileForm.value)
          .then((result) => {
            if (result) {
              this.isEditMode = false;
              this.user = result;
              this.loadForm();
              alert('Saved.');
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
    }
  }
}
