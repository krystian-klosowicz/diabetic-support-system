import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_model/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../_service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
    private _router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
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

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (res) => {
        console.log('User deleted successfully');
        this.loadUsers();
        // Możesz tutaj odświeżyć dane w tabeli lub zrobić inną akcję
      },
      error: (err) => {
        console.error('Error deleting user: ', err);
      },
    });
  }

  deleteUserWithConfirmation(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.deleteUser(userId);
    }
  }

  editUser(userId: number) {
    this._router.navigate(['/admin-panel/edit-user', userId]);
  }
}
