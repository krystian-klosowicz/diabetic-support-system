import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  template: `
    <div class="edit-dialog-container">
      <h2 mat-dialog-title>Edit Sugar Value</h2>
      <div mat-dialog-content>
        <mat-form-field style="background-color: white;">
          <input
            matInput
            type="number"
            appearance="outline"
            [(ngModel)]="editedValue"
            required
          />
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onCancel()" color="warn">Cancel</button>
        <button mat-button (click)="onSave()" color="mat-error">Save</button>
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
export class SugarDialogComponent {
  editedValue: number;

  constructor(
    public dialogRef: MatDialogRef<SugarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: number }
  ) {
    this.editedValue = data.value;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.editedValue);
  }
}
