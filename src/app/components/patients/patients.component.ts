import { Component, ViewChild } from '@angular/core';
import { MyProfile } from '../../_model';
import { PatientService } from '../../_service/patient.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY } from 'rxjs';
import { AddPatientDialogComponent } from './add-patient-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
})
export class PatientsComponent {
  dataSourcePatients: any;
  dataSourceUnassignedPatients: any;
  patients: MyProfile[] = [];
  unAssignedPatients: MyProfile[] = [];
  patientsDisplayedColumns: string[] = [
    'firstName',
    'lastName',
    'pesel',
    'diabetesType',
    'email',
    'phoneNumber',
    'action',
  ];

  patientsDisplayedColumns2: string[] = [
    'firstName',
    'lastName',
    'pesel',
    'diabetesType',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private patientService: PatientService,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.loadPatients();
    this.loadUnAssignedPatients();
  }

  public loadPatients() {
    this.patientService
      .getPatientsAssignedToDoctor()
      .then((result: MyProfile[]) => {
        if (result) {
          this.patients = result;
          this.dataSourcePatients = new MatTableDataSource<MyProfile>(
            this.patients
          );
          this.dataSourcePatients.paginator = this.paginator;
          this.dataSourcePatients.sort = this.sort;
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

  public loadUnAssignedPatients() {
    this.patientService
      .getPatientsNotAssignedToDoctor()
      .then((result: MyProfile[]) => {
        if (result) {
          this.unAssignedPatients = result;
          this.dataSourceUnassignedPatients = new MatTableDataSource<MyProfile>(
            this.unAssignedPatients
          );
          this.dataSourceUnassignedPatients.paginator = this.paginator;
          this.dataSourceUnassignedPatients.sort = this.sort;
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

  public unfollowPatient(myprofile: MyProfile) {
    console.log(myprofile);
    this.patientService
      .unAssignPatient(myprofile)
      .then((result: any) => {
        if (result) {
          this.loadPatients();
          this.loadUnAssignedPatients();
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

  public openAddPatientDialog() {
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      width: '1400px',
      height: '800px',
      data: {
        dataSourcePatients: this.dataSourceUnassignedPatients,
        patientsDisplayedColumn: this.patientsDisplayedColumns2,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.loadPatients();
        this.loadUnAssignedPatients();
      }
    });
  }

  public filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSourcePatients.filter = value;
  }
}
