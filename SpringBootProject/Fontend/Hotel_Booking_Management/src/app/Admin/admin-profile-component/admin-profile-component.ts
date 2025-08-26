import { Component, OnInit } from '@angular/core';
import { Admin } from '../../model/Admin.model';
import { AdminService } from '../../service/admin-service';

@Component({
  selector: 'app-admin-profile-component',
  standalone: false,
  templateUrl: './admin-profile-component.html',
  styleUrl: './admin-profile-component.css'
})
export class AdminProfileComponent implements OnInit {

  admin: Admin | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getProfile().subscribe({
      next: (data) => {
        console.log('Admin profile:', data);
        this.admin = data;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }


}
