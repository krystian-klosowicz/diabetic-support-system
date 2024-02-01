import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
})
export class MyProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  // userId: string = '';
  userId: string | null = '';
  matItem: string | null = '1';

  public ngOnInit() {
    // const role = this.authService.getUserId();
    // this.userId = role !== null ? role : 'null';
    this.userId = this.authService.getUserId();
  }

  public setMatItem(itemNumber: string) {
    this.matItem = itemNumber;
  }
}
