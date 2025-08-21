import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customerservice } from '../../service/customerservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-reg-component',
  standalone: false,
  templateUrl: './customer-reg-component.html',
  styleUrl: './customer-reg-component.css'
})
export class CustomerRegComponent {

  userForm!: FormGroup;
  customerForm!: FormGroup;
  photoFile!: File;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private customerService: Customerservice, // Replace with actual service type
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    this.customerForm = fb.group({
      
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

    if (this.userForm.invalid || this.customerForm.invalid) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    const user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      role: 'CUSTOMER'
    };

    const customer = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      gender: this.customerForm.value.gender,
      address: this.customerForm.value.address,
      dateOfBirth: this.customerForm.value.dateOfBirth

    };
console.log(user);
console.log(customer);

    this.customerService.registerCustomer(user, customer, this.photoFile).subscribe({

      next: res => {
        this.message = res.message || 'Customer registered successfully!';
        this.userForm.reset();
        this.customerForm.reset();
        this.photoFile = undefined!;
        this.router.navigate(['/login']);

      },
      error: err => {
        this.message = 'Registration failed. Please try again.'; +(err.error?.message || err.message);
      }
    });
  }

}
