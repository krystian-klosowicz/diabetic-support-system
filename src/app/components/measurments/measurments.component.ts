import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../auth.service';
import { SugarService } from '../../_service/sugar.service';
import { InsulinDose, Medication, SugarLevel } from '../../_model';
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
import { InsulinDosesService } from '../../_service/insulin-doses.service';
import { InsulinDialogComponent } from './insulin-dialog.component';
import { MedicationService } from '../../_service/medication.service';
import { MedicationDialogComponent } from './medication-dialog.component';
import { BloodPressureService } from '../../_service/blood-pressure.service';
import { BloodPressure } from '../../_model/blood-pressure.interface';
import { BloodPressureDialogComponent } from './blood-pressure-dialog.component';
@Component({
  selector: 'app-measurments',
  templateUrl: './measurments.component.html',
  styleUrl: './measurments.component.css',
  providers: [DatePipe, provideNativeDateAdapter()],
})
export class MeasurmentsComponent implements AfterViewInit {
  userRole: string | null = '';
  matItem: string | null = '1';
  dateControl = new FormControl();
  selectedDate: Date;
  //sugar
  dataSourceSugar: any;
  sugarMeasurements: SugarLevel[] = [];
  sugarDisplayedColumns: string[] = ['sugar_level', 'date', 'hour', 'action'];
  //insulinDoses
  dataSourceInsulin: any;
  insulinDoses: InsulinDose[] = [];
  insulinDisplayedColumns: string[] = [
    'units_of_insulin',
    'taking_hour',
    'action',
  ];
  //medication
  dataSourceMedication: any;
  medications: Medication[] = [];
  medicationDisplayedColumns: string[] = [
    'name',
    'dosage',
    'freq_per_day',
    'taking_time',
    'action',
  ];
  //bloodPressure
  dataSourceBloodPressure: any;
  blood_pressures: BloodPressure[] = [];
  bloodPressuresDisplayedColumns: string[] = [
    'sys_pressure',
    'dia_pressure',
    'pulse',
    'date',
    'hour',
    'action',
  ];

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private observer: BreakpointObserver,
    private authService: AuthService,
    private sugarService: SugarService,
    private medicationService: MedicationService,
    private insulinService: InsulinDosesService,
    private bloodPressureService: BloodPressureService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  public setMatItem(itemNumber: string) {
    this.matItem = itemNumber;
    this.selectedDate = new Date();
  }

  public ngOnInit() {
    this.userRole = this.authService.getRole(); // Wczytanie roli użytkownika
    this.loadSugarLevels(); // Załadowanie tabeli z pomiarami
    this.loadInsulinDoses();
    this.loadMedications();
    this.loadBloodPressures();
    this.selectedDate = new Date(); // Dzisiejsza data
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
    } else if (this.datePipe && selected === 'datetime') {
      return this.datePipe.transform(backendDate, 'yyyy-MM-dd HH:mm');
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

    this.dataSourceBloodPressure.filter = this.selectedDate
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

  //Insulin doses

  public addInsulinDose(): void {
    const dialogRef = this.dialog.open(InsulinDialogComponent, {
      width: '400px',
      data: { value: 0, hour: 0, action: 'Add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const newInsulinDose: InsulinDose = {
          id: 0,
          units_of_insulin: result.units_of_insulin,
          taking_hour: this.formatHour(result.taking_hour),
        };

        console.log(newInsulinDose);
        this.insulinService
          .addInsulinDose(newInsulinDose)
          .then((result) => {
            if (result) {
              this.loadInsulinDoses();
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

  public loadInsulinDoses() {
    this.insulinService
      .getInsulinDoses()
      .then((result: InsulinDose[]) => {
        if (result) {
          this.insulinDoses = result;
          this.dataSourceInsulin = new MatTableDataSource<InsulinDose>(
            this.insulinDoses
          );
          this.dataSourceInsulin.paginator = this.paginator;
          this.dataSourceInsulin.sort = this.sort;
          // this.dataSourceInsulin.filter = this.selectedDate
          //   ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')
          //   : '';
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

  public editInsulinDose(insulin: InsulinDose): void {
    const dialogRef = this.dialog.open(InsulinDialogComponent, {
      width: '400px',
      data: {
        value: insulin.units_of_insulin,
        hour: this.parseHour(insulin.taking_hour),
        action: 'Edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        insulin.units_of_insulin = result.units_of_insulin;
        insulin.taking_hour = this.formatHour(result.taking_hour);
        this.insulinService
          .updateInsulinDose(insulin)
          .then((result) => {
            if (result) {
              this.loadInsulinDoses();
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

  public deleteInsulinDose(id: number): void {
    if (confirm('Are you sure you want to delete this insulin dose?'))
      this.insulinService.deleteInsulinDose(id).subscribe({
        next: () => this.loadInsulinDoses(),
        error: (err) => console.error('Error deleting measurement: ', err),
      });
  }

  private formatHour(hour: number): string {
    // Format the hour as a two-digit number and add ':00:00'
    return (
      hour.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) + ':00:00'
    );
  }

  private parseHour(hourString: string): number {
    // Wyodrębnij tylko część z godziną, np. "12" z "12:00:00"
    const hourPart = hourString.split(':')[0];
    // Zamień na liczbę
    return parseInt(hourPart, 10);
  }

  //medications

  public addMedication(): void {
    const dialogRef = this.dialog.open(MedicationDialogComponent, {
      width: '400px',
      data: {
        medication: {
          id: 0,
          name: '',
          dosage: 'dosage',
          freq_per_day: 'freq_per_day',
          taking_time: '',
        },
        action: 'Add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const newMedication: Medication = {
          id: 0,
          name: result.name,
          dosage: result.dosage,
          freq_per_day: result.freq_per_day,
          taking_time: result.taking_time,
        };

        console.log(newMedication);
        this.medicationService
          .addMedication(newMedication)
          .then((result) => {
            if (result) {
              this.loadMedications();
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

  public loadMedications() {
    this.medicationService
      .getMedications()
      .then((result: Medication[]) => {
        if (result) {
          this.medications = result;
          this.dataSourceMedication = new MatTableDataSource<Medication>(
            this.medications
          );
          this.dataSourceMedication.paginator = this.paginator;
          this.dataSourceMedication.sort = this.sort;
          // this.dataSourceInsulin.filter = this.selectedDate
          //   ? this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')
          //   : '';
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

  public editMedication(medication: Medication): void {
    const dialogRef = this.dialog.open(MedicationDialogComponent, {
      width: '400px',
      data: {
        medication: {
          id: medication.id,
          name: medication.name,
          dosage: medication.dosage,
          freq_per_day: medication.freq_per_day,
          taking_time: medication.taking_time,
        },
        action: 'Edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        medication.name = result.name;
        medication.dosage = result.dosage;
        medication.freq_per_day = result.freq_per_day;
        medication.taking_time = result.taking_time;

        this.medicationService
          .updateMedication(medication)
          .then((result) => {
            if (result) {
              this.loadMedications();
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

  public deleteMedication(id: number): void {
    if (confirm('Are you sure you want to delete this medication?'))
      this.medicationService.deleteMedication(id).subscribe({
        next: () => this.loadMedications(),
        error: (err) => console.error('Error deleting measurement: ', err),
      });
  }

  //blood_pressure

  public addBloodPressure(): void {
    const dialogRef = this.dialog.open(BloodPressureDialogComponent, {
      width: '400px',
      data: {
        medication: {
          id: 0,
          sys_pressure: 'Sys pressure',
          dia_pressure: 'Dia pressure',
          pulse: 'Pulse',
        },
        action: 'Add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const newBloodPressure: BloodPressure = {
          id: 0,
          sys_pressure: result.sys_pressure,
          dia_pressure: result.dia_pressure,
          pulse: result.pulse,
          measurement_date: new Date(),
        };

        this.bloodPressureService
          .addBloodPressure(newBloodPressure)
          .then((result) => {
            if (result) {
              this.loadBloodPressures();
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

  public loadBloodPressures() {
    this.bloodPressureService
      .getBloodPressures()
      .then((result: BloodPressure[]) => {
        if (result) {
          this.blood_pressures = result;
          this.dataSourceBloodPressure = new MatTableDataSource<BloodPressure>(
            this.blood_pressures
          );
          this.dataSourceBloodPressure.paginator = this.paginator;
          this.dataSourceBloodPressure.sort = this.sort;
          this.dataSourceBloodPressure.filter = this.selectedDate
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

  public editBloodPressure(blood_pressure: BloodPressure): void {
    const dialogRef = this.dialog.open(BloodPressureDialogComponent, {
      width: '400px',
      data: {
        bloodPressure: {
          id: blood_pressure.id,
          sys_pressure: blood_pressure.sys_pressure,
          dia_pressure: blood_pressure.dia_pressure,
          pulse: blood_pressure.pulse,
          measurement_date: blood_pressure.measurement_date,
        },
        action: 'Edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        blood_pressure.sys_pressure = result.sys_pressure;
        blood_pressure.dia_pressure = result.dia_pressure;
        blood_pressure.pulse = result.pulse;

        this.bloodPressureService
          .updateBloodPressure(blood_pressure)
          .then((result) => {
            if (result) {
              this.loadBloodPressures();
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

  public deleteBloodPressure(id: number): void {
    if (
      confirm('Are you sure you want to delete this blood pressure measurment?')
    )
      this.bloodPressureService.deleteBloodPressure(id).subscribe({
        next: () => this.loadBloodPressures(),
        error: (err) => console.error('Error deleting measurement: ', err),
      });
  }
}
