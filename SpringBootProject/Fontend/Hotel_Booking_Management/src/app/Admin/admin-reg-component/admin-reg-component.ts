import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reg-component',
  standalone: false,
  templateUrl: './admin-reg-component.html',
  styleUrl: './admin-reg-component.css'
})
export class AdminRegComponent {


  userForm!: FormGroup;
  adminForm!: FormGroup;
  photoFile!: File;
  message: string = '';


  constructor(
    private fb: FormBuilder,
    private adminService: AdminService, // Replace with actual service type
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    this.adminForm = fb.group({
      gender: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }


  onPhotoSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.photoFile = event.target.files[0];

      console.log('Selected photo:', this.photoFile);
    }
  }


  onSubmit(): void {

    if (!this.photoFile) {
      this.message = 'Please select a photo.';
      return;
    }

    if (this.userForm.invalid || this.adminForm.invalid) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    const user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      role: 'ADMIN'
    };

    const admin = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      gender: this.adminForm.value.gender,
      address: this.adminForm.value.address,
      dateOfBirth: this.adminForm.value.dateOfBirth

    };
    console.log(user);
    console.log(admin)

    this.adminService.registerAdmin(user, admin, this.photoFile).subscribe({

      next: res => {
        this.message = res.message || 'Admin registered successfully!';
        this.userForm.reset();
        this.adminForm.reset();
        this.photoFile = undefined!;
        this.router.navigate(['login']);

      },
      error: err => {
        this.message = 'Registration failed. Please try again.'; +(err.error?.message || err.message);
      }
    });
  }



}
