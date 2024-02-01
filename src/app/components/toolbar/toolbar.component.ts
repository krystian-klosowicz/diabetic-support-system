import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexModule } from '@angular/flex-layout/flex';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  standalone: true,
  imports: [
    FlexModule,
    MatToolbarModule,
    MatIconModule,
    ExtendedModule,
    MatButtonModule,
    RouterLink,
    MatMenuModule,
    CommonModule,
  ],
})
export class ToolbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  userRole: string | null = '';

  public ngOnInit() {
    this.userRole = this.authService.getRole();
  }
}
