import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent implements OnInit {

  users: any[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;

    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.users || [];
        this.loading = false;
      },
      error: () => {
        this.users = [];
        this.loading = false;
      }
    });
  }
}