import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Medication } from '../../_model';

@Component({
  selector: 'app-edit-dialog',
  template: `
    <div class="edit-dialog-container">
      <h2 mat-dialog-title>
        {{ actionValue === 'Add' ? 'Add' : 'Edit' }} Medication
      </h2>
      <div mat-dialog-content>
        <mat-form-field style="background-color: white;">
          <input
            matInput
            placeholder="Name"
            [(ngModel)]="editedMedication.name"
            required
          />
        </mat-form-field>
        <mat-form-field style="background-color: white;">
          <input
            matInput
            type="number"
            placeholder="Dosage"
            [(ngModel)]="editedMedication.dosage"
            required
          />
        </mat-form-field>
        <mat-form-field style="background-color: white;">
          <input
            matInput
            type="number"
            placeholder="Frequency per day"
            [(ngModel)]="editedMedication.freq_per_day"
            required
          />
        </mat-form-field>
        <mat-form-field style="background-color: white;">
          <input
            matInput
            placeholder="Taking Time"
            [(ngModel)]="editedMedication.taking_time"
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
        background-color: #007bff; /* Kolor tła przycisku */
        color: #fff; /* Kolor tekstu przycisku */
        padding: 10px 20px; /* Wewnętrzny margines przycisku */
        border: none; /* Usuń obramowanie przycisku */
        border-radius: 4px; /* Zaokrąglenie narożników przycisku */
        cursor: pointer; /* Zmień kursor na wskaźnik przy najechaniu */
      }
    `,
  ],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
})
export class MedicationDialogComponent {
  editedMedication: Medication = {
    id: 0,
    name: '',
    dosage: 0,
    freq_per_day: 0,
    taking_time: '',
  };
  actionValue: string;

  constructor(
    public dialogRef: MatDialogRef<MedicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { medication: Medication; action: string }
  ) {
    this.editedMedication = { ...data.medication };
    this.actionValue = data.action;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.editedMedication);
  }
}
