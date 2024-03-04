import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MyProfile } from '../../_model';
import { PatientService } from '../../_service/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardFooter } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-patient-dialog',
  template: `
    <h2 mat-dialog-title>Patients</h2>
    <mat-form-field appearance="outline" style="width: 20%; margin-left: auto">
      <mat-label>Find patient..</mat-label>
      <input
        matInput
        (keyup)="filterChange($event)"
        placeholder="Enter the text"
      />
    </mat-form-field>

    <table matSort mat-table [dataSource]="data.dataSourcePatients">
      <ng-container matColumnDef="firstName">
        <th mat-header-cell *matHeaderCellDef>First name</th>
        <td mat-cell *matCellDef="let element">
          {{ element.firstName }}
        </td>
      </ng-container>

      <ng-container matColumnDef="lastName">
        <th mat-header-cell *matHeaderCellDef>Last name</th>
        <td mat-cell *matCellDef="let element">
          {{ element.lastName }}
        </td>
      </ng-container>
      <ng-container matColumnDef="pesel">
        <th mat-header-cell *matHeaderCellDef>Pesel</th>
        <td mat-cell *matCellDef="let element">
          {{ element.pesel }}
        </td>
      </ng-container>
      <ng-container matColumnDef="diabetesType">
        <th mat-header-cell *matHeaderCellDef>Diabetes type</th>
        <td mat-cell *matCellDef="let element">
          {{ element.diabetesType }}
        </td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef="let element" class="action-buttons">
          <button mat-raised-button color="warn" (click)="addPatient(element)">
            Add patient
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="patientsDisplayedColumns2"></tr>
      <tr
        mat-row
        *matRowDef="let row; columns: patientsDisplayedColumns2; let odd = odd"
      ></tr>
    </table>
    <mat-card-footer>
      <mat-paginator
        [pageSizeOptions]="[10, 15, 20]"
        showFirstLastButtons=""
      ></mat-paginator>
    </mat-card-footer>
  `,
  styleUrl: './patients.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatPaginator,
    MatCardFooter,
    MatTableModule,
  ],
})
export class AddPatientDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<AddPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientService: PatientService
  ) {
    console.log(data.dataSourcePatients);
  }

  patientsDisplayedColumns2: string[] = [
    'firstName',
    'lastName',
    'pesel',
    'diabetesType',
    'action',
  ];

  public filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.data.dataSourcePatients.filter = value;
  }

  public addPatient(myprofile: MyProfile) {
    console.log(myprofile);
    this.patientService
      .assignToDoctor(myprofile)
      .then((result: any) => {
        if (result) {
          this.onAdd();
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

  onAdd(): void {
    this.dialogRef.close(this.data);
  }
}
