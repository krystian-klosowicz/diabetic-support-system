import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../environments/environment.development';
import { User } from '../../_model/user.interface';
import { UserService } from '../../_service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [ToolbarComponent, MatCardModule, CommonModule],
})
export class HomeComponent implements OnInit {
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
    private userService: UserService
  ) {}

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
