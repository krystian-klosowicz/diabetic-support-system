import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  template: `
    <div class="edit-dialog-container">
      <h2 mat-dialog-title>{{ actionValue }} Insulin Dose</h2>
      <div mat-dialog-content>
        <mat-form-field style="background-color: white;">
          Insulin Dose:
          <input
            matInput
            type="number"
            placeholder="Insulin Dose"
            [(ngModel)]="editedValue"
            required
          />
        </mat-form-field>
        <mat-form-field style="background-color: white;">
          Taking hour:
          <input
            matInput
            type="number"
            placeholder="Taking Hour"
            [(ngModel)]="editedHour"
            min="0"
            max="23"
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
export class InsulinDialogComponent {
  editedValue: number;
  editedHour: number;
  actionValue: string;

  constructor(
    public dialogRef: MatDialogRef<InsulinDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { value: number; hour: number; action: string }
  ) {
    this.editedValue = data.value;
    this.editedHour = data.hour;
    this.actionValue = data.action;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close({
      units_of_insulin: this.editedValue,
      taking_hour: this.editedHour,
    });
  }
}
