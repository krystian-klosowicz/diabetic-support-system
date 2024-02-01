import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
})
export class EditUserComponent {
  userId: string | null = null;
  matItem: string | null = '1';

  constructor(private route: ActivatedRoute) {}

  public ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  public setMatItem(itemNumber: string) {
    this.matItem = itemNumber;
  }
}
