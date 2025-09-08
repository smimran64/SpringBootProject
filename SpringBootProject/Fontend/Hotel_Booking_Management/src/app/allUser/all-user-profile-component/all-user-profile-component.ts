import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-all-user-profile-component',
  standalone: false,
  templateUrl: './all-user-profile-component.html',
  styleUrl: './all-user-profile-component.css'
})
export class AllUserProfileComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  selectedRole: string = 'All';

  roles: string[] = ['All', 'Admin', 'Hotel_Admin', 'Customer'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
  



  filterUsers() {
    if (this.selectedRole === 'All') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(u => u.role.toLowerCase() === this.selectedRole.toLowerCase());
    }
  }

  viewDetails(user: User) {
    
  }

}
