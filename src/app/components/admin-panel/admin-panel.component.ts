import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_model/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../_service/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
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

  ngOnInit() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
}
