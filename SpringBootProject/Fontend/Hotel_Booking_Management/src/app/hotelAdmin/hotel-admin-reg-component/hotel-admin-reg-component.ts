import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelAdminService } from '../../service/hotel-admin-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-admin-reg-component',
  standalone: false,
  templateUrl: './hotel-admin-reg-component.html',
  styleUrl: './hotel-admin-reg-component.css'
})
export class HotelAdminRegComponent {

  userForm!: FormGroup;
  hotelAdminForm!: FormGroup;
  photoFile!: File;
  message: string = '';


  constructor(
    private fb: FormBuilder,
    private hotelAdminService: HotelAdminService, // Replace with actual service type
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    this.hotelAdminForm = fb.group({      
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

    if (this.userForm.invalid || this.hotelAdminForm.invalid) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    const user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      role: ' HOTEL_ADMIN'
    };

    const hotelAdmin = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      gender: this.hotelAdminForm.value.gender,
      address: this.hotelAdminForm.value.address,
      dateOfBirth: this.hotelAdminForm.value.dateOfBirth

    };
console.log(user);
console.log(hotelAdmin)

    this.hotelAdminService.registerHotelAdmin(user, hotelAdmin, this.photoFile).subscribe({

      next: res => {
        this.message = res.message || 'Hotel Admin registered successfully!';
        this.userForm.reset();
        this.hotelAdminForm.reset();
        this.photoFile = undefined!;
        this.router.navigate(['']);

      },
      error: err => {
        this.message = 'Registration failed. Please try again.'; +(err.error?.message || err.message);
      }
    });
  }

}
