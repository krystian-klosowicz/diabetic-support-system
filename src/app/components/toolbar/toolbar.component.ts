import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  userRole: string = '';

  ngOnInit() {
    const role = this.authService.getRole();
    this.userRole = role !== null ? role : 'defaultRole';
  }
}
