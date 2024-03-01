import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_model/user.interface';
import { UserService } from '../../_service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { NgbAlert, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    ToolbarComponent,
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

  public ngOnInit() {
    // this.userService.getUsers().subscribe((response) => {
    //   this.users = response;
    //   this.dataSource = new MatTableDataSource<User>(this.users);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }

  // private filterChange(data: Event) {
  //   const value = (data.target as HTMLInputElement).value;
  //   this.dataSource.filter = value;
  // }
}
