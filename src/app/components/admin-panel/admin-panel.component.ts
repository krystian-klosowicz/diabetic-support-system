import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_model/user.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../_service/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    ExtendedModule,
    MatPaginatorModule,
    CommonModule,
  ],
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
    private router: Router,
    private userService: UserService
  ) {}

  public ngOnInit() {
    this.loadUsers();
  }

  public filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  public deleteUserWithConfirmation(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.deleteUser(userId);
    }
  }

  public editUser(userId: number) {
    this.router.navigate(['/admin-panel/edit-user', userId]);
  }

  private loadUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (res) => {
        console.log('User deleted successfully');
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error deleting user: ', err);
      },
    });
  }
}
