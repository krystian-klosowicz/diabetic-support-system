import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_model/user.interface';
import { UserService } from '../../_service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgbAlert, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MyProfile } from '../../_model';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    ToolbarComponent,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    NgbCarouselModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbAlert,
  ],
})
export class HomeComponent implements OnInit {
  public images = [700, 533, 807, 124].map(
    (n) => `https://picsum.photos/id/${n}/900/500`
  );
  users: User[] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'role',
    'firstName',
    'lastName',
    'email',
    'pesel',
    'phoneNumber',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  user: MyProfile | undefined;
  phoneNumber: string | null = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private userService: UserService,
    config: NgbCarouselConfig
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  encodeMessage(message: string): string {
    return encodeURIComponent(message);
  }

  public ngOnInit() {
    this.loadMyProfile();
  }

  public loadMyProfile() {
    this.userService
      .getMyProfile()
      .then((result) => {
        if (result) {
          this.user = result;
          this.phoneNumber = this.user.safetyNumber;
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
