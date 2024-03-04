import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BloodPressure } from '../../_model'; // Assuming BloodPressure interface has sys_pressure, dia_pressure, and pulse properties

@Component({
  selector: 'app-edit-dialog',
  template: `
    <div class="edit-dialog-container">
      <h2 mat-dialog-title>
        {{ actionValue === 'Add' ? 'Add' : 'Edit' }} Blood Pressure
      </h2>
      <div mat-dialog-content>
        <mat-form-field style="background-color: white;">
          <input
            matInput
            type="number"
            placeholder="Systolic Pressure"
            [(ngModel)]="editedBloodPressure.sys_pressure"
            required
          />
        </mat-form-field>
        <mat-form-field style="background-color: white;">
          <input
            matInput
            type="number"
            placeholder="Diastolic Pressure"
            [(ngModel)]="editedBloodPressure.dia_pressure"
            required
          />
        </mat-form-field>
        <mat-form-field style="background-color: white;">
          <input
            matInput
            type="number"
            placeholder="Pulse"
            [(ngModel)]="editedBloodPressure.pulse"
            required
          />
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onCancel()" color="warn">Cancel</button>
        <button mat-button (click)="onSave()" color="mat-error">
          {{ actionValue === 'Add' ? 'Add' : 'Save' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .edit-dialog-container {
        text-align: center;
      }

      mat-form-field {
        width: 80%;
        margin-bottom: 10px;
      }

      mat-dialog-actions {
        justify-content: center;
        margin-top: 16px;
      }

      button {
        margin-bottom: 5px;
        margin-left: 5px;
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
})
export class BloodPressureDialogComponent {
  editedBloodPressure: BloodPressure = {
    id: 0,
    sys_pressure: 0,
    dia_pressure: 0,
    pulse: 0,
    measurement_date: new Date(),
  };
  actionValue: string;

  constructor(
    public dialogRef: MatDialogRef<BloodPressureDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { bloodPressure: BloodPressure; action: string }
  ) {
    this.editedBloodPressure = { ...data.bloodPressure };
    this.actionValue = data.action;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.editedBloodPressure);
  }
}
