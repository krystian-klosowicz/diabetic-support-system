import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  userRole: string = '';

  ngOnInit() {
    const role = this.authService.getRole();
    this.userRole = role !== null ? role : 'defaultRole';
  }
}
