import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Admin } from '../../model/Admin.model';
import { AdminService } from '../../service/admin-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-profile-component',
  standalone: false,
  templateUrl: './admin-profile-component.html',
  styleUrl: './admin-profile-component.css'
})
export class AdminProfileComponent implements OnInit {

  adminProfile?: Admin;
  loading = true;
  error?: string;

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.adminService.getLoggedInAdminProfile().subscribe({
      next: (data) => {
        console.log('Admin profile fetched:', data);
        this.adminProfile = data;
        this.cdr.markForCheck();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching profile', err);
        this.error = 'Failed to load admin profile';
        this.loading = false;
      }
    });
  }




}
