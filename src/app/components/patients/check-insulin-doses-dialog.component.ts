import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InsulinDose, MyProfile, SugarLevel } from '../../_model';
import { PatientService } from '../../_service/patient.service';
import { EMPTY } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardFooter } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ChartDialogComponent } from '../measurments/chart-dialog/chart-dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCard } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { SugarService } from '../../_service/sugar.service';
import { InsulinDosesService } from '../../_service/insulin-doses.service';

@Component({
  selector: 'app-patient-dialog',
  providers: [DatePipe, provideNativeDateAdapter()],
  template: `
    <h2 mat-dialog-title style="text-align: center;">Insulin doses</h2>

    <div style="padding:1%; text-align:right;">
      <table matSort mat-table [dataSource]="dataSourceInsulin">
        <ng-container matColumnDef="taking_hour">
          <th mat-header-cell *matHeaderCellDef>Taking hour</th>
          <td mat-cell *matCellDef="let element">
            {{ element.taking_hour }}
          </td>
        </ng-container>

        <ng-container matColumnDef="units_of_insulin">
          <th mat-header-cell *matHeaderCellDef>Units of insuline</th>
          <td mat-cell *matCellDef="let element">
            {{ element.units_of_insulin }}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="insulinDisplayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: insulinDisplayedColumns; let odd = odd"
        ></tr>
      </table>
    </div>
  `,
  styleUrl: './patients.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatPaginator,
    MatCardFooter,
    MatTableModule,
    MatDatepicker,
    FormsModule,
    MatDatepickerModule,
    MatCard,
  ],
})
export class CheckInsulinDosesDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<CheckInsulinDosesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientService: PatientService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private insulinService: InsulinDosesService
  ) {}

  public ngOnInit() {
    this.loadInsulinDosesByUser();
  }

  dataSourceInsulin: any;
  insulinDoses: InsulinDose[] = [];
  insulinDisplayedColumns: string[] = ['units_of_insulin', 'taking_hour'];

  onAdd(): void {
    this.dialogRef.close(this.data);
  }

  formatDateTime(date: string, selected: string) {
    const backendDate = new Date(date);

    if (this.datePipe && selected === 'date') {
      return this.datePipe.transform(backendDate, 'yyyy-MM-dd');
    } else if (this.datePipe && selected === 'time') {
      return this.datePipe.transform(backendDate, 'HH:mm');
    } else if (this.datePipe && selected === 'datetime') {
      return this.datePipe.transform(backendDate, 'yyyy-MM-dd HH:mm');
    } else {
      return 'Invalid input';
    }
  }

  public loadInsulinDosesByUser() {
    this.insulinService
      .getInsulinDosesByUser(this.data.patient.email)
      .then((result: InsulinDose[]) => {
        if (result) {
          this.insulinDoses = result;
          this.dataSourceInsulin = new MatTableDataSource<InsulinDose>(
            this.insulinDoses
          );
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
