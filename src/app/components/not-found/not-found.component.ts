import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  standalone: true,
  imports: [
    FlexModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
})
export class NotFoundComponent {}
