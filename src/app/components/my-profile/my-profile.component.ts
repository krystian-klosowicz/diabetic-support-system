import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  userId: string = '';
  matItem: string | null = '1';

  setMatItem(itemNumber: string) {
    this.matItem = itemNumber;
  }

  ngOnInit() {
    const role = this.authService.getUserId();
    this.userId = role !== null ? role : 'null';
  }
}
