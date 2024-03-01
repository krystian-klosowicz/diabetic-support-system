import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../auth.service';
import { SugarService } from '../../_service/sugar.service';
import { SugarLevel } from '../../_model';
import { EMPTY } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SugarDialogComponent } from './sugar-dialog.component';

@Component({
  selector: 'app-measurments',
  templateUrl: './measurments.component.html',
  styleUrl: './measurments.component.css',
  providers: [DatePipe],
})
export class MeasurmentsComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

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
    this.userRole = this.authService.getRole();
    this.loadSugarLevels();
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
          console.log(result);
          this.sugarMeasurements = result;
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

  public deleteMeasurement(id: number): void {
    if (confirm('Are you sure you want to delete this user?'))
      this.sugarService.deleteMeasurement(id).subscribe({
        next: () => this.loadSugarLevels(),
        error: (err) => console.error('Error deleting measurement: ', err),
      });
  }

  public editMeasurement(sugar: SugarLevel): void {
    const dialogRef = this.dialog.open(SugarDialogComponent, {
      width: '400px',
      data: { value: sugar.sugar_level },
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
}
