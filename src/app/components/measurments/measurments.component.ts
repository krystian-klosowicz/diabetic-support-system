import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../auth.service';
import { SugarService } from '../../_service/sugar.service';
import { SugarLevel } from '../../_model';
import { EMPTY } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SugarDialogComponent } from './sugar-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
@Component({
  selector: 'app-measurments',
  templateUrl: './measurments.component.html',
  styleUrl: './measurments.component.css',
  providers: [DatePipe, provideNativeDateAdapter()],
})
export class MeasurmentsComponent implements AfterViewInit {
  dataSourceSugar: any;
  dateControl = new FormControl();
  selectedDate: Date;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private observer: BreakpointObserver,
    private authService: AuthService,
    private sugarService: SugarService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  userRole: string | null = '';
  matItem: string | null = '1';
  sugarMeasurements: SugarLevel[] = [];
  displayedColumns: string[] = ['sugar_level', 'date', 'hour', 'action'];

  public setMatItem(itemNumber: string) {
    this.matItem = itemNumber;
    // this.isEditMode = false;
    // this.loadForm();
  }

  public ngOnInit() {
    this.userRole = this.authService.getRole(); // Wczytanie roli użytkownika
    this.loadSugarLevels(); // Załadowanie tabeli z pomiarami
    this.selectedDate = new Date(); // Dzisiejsza datat
  }

  ngAfterViewInit() {
    this.observer.observe([`(max-width: 800px)`]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  formatDateTime(date: string, selected: string) {
    const backendDate = new Date(date);

    if (this.datePipe && selected === 'date') {
      return this.datePipe.transform(backendDate, 'yyyy-MM-dd');
    } else if (this.datePipe && selected === 'time') {
      return this.datePipe.transform(backendDate, 'HH:mm');
    } else {
      return 'Invalid input';
    }
  }

  //Sugars
  public loadSugarLevels() {
    this.sugarService
      .getSugarLevels()
      .then((result: SugarLevel[]) => {
        if (result) {
          this.sugarMeasurements = result;
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

  public deleteSugarMeasurement(id: number): void {
    if (confirm('Are you sure you want to delete this measurement?'))
      this.sugarService.deleteMeasurement(id).subscribe({
        next: () => this.loadSugarLevels(),
        error: (err) => console.error('Error deleting measurement: ', err),
      });
  }

  public addSugarMeasurement(): void {
    const dialogRef = this.dialog.open(SugarDialogComponent, {
      width: '400px',
      data: { value: 0, action: 'Add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const newSugarLevel: SugarLevel = {
          id: 0,
          sugar_level: result,
          measurement_date: new Date(),
        };
        this.sugarService
          .addMeasurement(newSugarLevel)
          .then((result) => {
            if (result) {
              this.loadSugarLevels();
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
    });
  }

  public editSugarMeasurement(sugar: SugarLevel): void {
    const dialogRef = this.dialog.open(SugarDialogComponent, {
      width: '400px',
      data: { value: sugar.sugar_level, action: 'Edit' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        sugar.sugar_level = result;
        this.sugarService
          .updateMeasurement(sugar)
          .then((result) => {
            if (result) {
              this.loadSugarLevels();
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
    });
  }
  dateChanged(event: any): void {
    this.dataSourceSugar.filter = this.selectedDate
      ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')
      : '';
  }

  public openChartDialog(): void {
    //Filtrowanie daty
    const sugarMeasurementsForDate = this.sugarMeasurements.filter(
      (measurement) =>
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

  //Blood pressure
}
