import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user-service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute


  ) { }

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

  // viewDetails(user: User) {

  // }

  viewDetails(user: User) {
    const roleRouteMap: { [key: string]: string } = {
      'customer': '/customerProfile',
      'admin': '/admin-profile',
      'hotel_admin': '/hoteladminProfile'
    };

    const role = user.role.toLowerCase();
    const route = roleRouteMap[role];
    if (route) {
      this.router.navigate([route, user.id]);
    } else {
      console.warn('Unknown role:', role);
    }
  }
}
