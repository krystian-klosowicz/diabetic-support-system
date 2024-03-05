import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MyProfile, SugarLevel } from '../../_model';
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

@Component({
  selector: 'app-patient-dialog',
  providers: [DatePipe, provideNativeDateAdapter()],
  template: `
    <h2 mat-dialog-title style="text-align: center;">
      Sugar level measurements
    </h2>
    <mat-form-field style="width:20%;margin-left:auto;padding-right:1%;">
      <mat-label>Choose a date</mat-label>
      <input
        matInput
        [matDatepicker]="picker"
        [(ngModel)]="selectedDate"
        (dateInput)="dateChanged($event)"
      />
      <mat-datepicker-toggle
        matIconSuffix
        [for]="picker"
      ></mat-datepicker-toggle>
      <mat-datepicker touchUi #picker></mat-datepicker>
    </mat-form-field>
    <div style="padding:1%; text-align:right;">
      <table matSort mat-table [dataSource]="dataSourceSugar">
        <ng-container matColumnDef="sugar_level">
          <th mat-header-cell *matHeaderCellDef>Sugar level</th>
          <td mat-cell *matCellDef="let element">
            {{ element.sugar_level }}
          </td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let element">
            {{ formatDateTime(element.measurement_date, 'date') }}
          </td>
        </ng-container>

        <ng-container matColumnDef="hour">
          <th mat-header-cell *matHeaderCellDef>Hour</th>
          <td mat-cell *matCellDef="let element">
            {{ formatDateTime(element.measurement_date, 'time') }}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="sugarDisplayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: sugarDisplayedColumns; let odd = odd"
        ></tr>
      </table>

      <mat-card-footer>
        <mat-paginator
          [pageSizeOptions]="[10, 15, 20]"
          showFirstLastButtons=""
        ></mat-paginator>
      </mat-card-footer>

      <button
        mat-raised-button
        (click)="openChartDialog()"
        style="  margin:0 auto;background-color: #15a345 !important;
  color: white !important;border:0;border-radius:5px;width:20%;height:40px;"
      >
        Check glucose chart
      </button>
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
export class CheckMeasurementsDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<CheckMeasurementsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientService: PatientService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private sugarService: SugarService
  ) {}

  public ngOnInit() {
    this.selectedDate = new Date();
    this.loadSugarLevelsByUser();
  }

  //sugar
  dataSourceSugar: any;
  sugarMeasurements: SugarLevel[] = [];
  sugarDisplayedColumns: string[] = ['sugar_level', 'date', 'hour'];
  selectedDate: Date;

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

  public openChartDialog(): void {
    const sugarMeasurementsForDate = this.sugarMeasurements.filter(
      (measurement: { measurement_date: string | number | Date }) =>
        new Date(measurement.measurement_date).toDateString() ===
        this.selectedDate.toDateString()
    );

    const dialogRef = this.dialog.open(ChartDialogComponent, {
      width: '80%',
      data: {
        sugarMeasurements: sugarMeasurementsForDate,
        selectedDate: this.selectedDate,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The chart dialog was closed');
    });
  }

  dateChanged(event: any): void {
    this.dataSourceSugar.filter = this.selectedDate
      ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')
      : '';
  }

  public loadSugarLevelsByUser() {
    this.sugarService
      .getSugarLevelsByUser(this.data.patient.email)
      .then((result: SugarLevel[]) => {
        if (result) {
          this.sugarMeasurements = result;
          console.log(result);
          this.dataSourceSugar = new MatTableDataSource<SugarLevel>(
            this.sugarMeasurements
          );
          this.dataSourceSugar.paginator = this.paginator;
          this.dataSourceSugar.sort = this.sort;
          this.dataSourceSugar.filter = this.selectedDate
            ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')
            : '';
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
