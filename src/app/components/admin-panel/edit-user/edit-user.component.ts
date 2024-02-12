import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../_service/user.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  user: any;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Odebranie danych przekazanych przez MatDialog
    this.user = data.element;
  }

  public getAccountStatus(active: boolean): string {
    switch (active) {
      case true:
        return 'enabled';
      case false:
        return 'disabled';
      default:
        return active;
    }
  }

  public getRoleDisplayName(role: string): string {
    switch (role) {
      case 'ROLE_DOCTOR':
        return 'DOCTOR';
      case 'ROLE_ADMIN':
        return 'ADMIN';
      case 'ROLE_PATIENT':
        return 'PATIENT';
      default:
        return role;
    }
  }

  public changeStatus() {
    this.userService
      .changeAcoountStatus(3)
      .then((result) => {
        if (!result) {
          alert('Password has been changed.');
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

  onSave(): void {
    // Tutaj dodaj logikę zapisu zmian
    this.dialogRef.close();
    alert('save');
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
