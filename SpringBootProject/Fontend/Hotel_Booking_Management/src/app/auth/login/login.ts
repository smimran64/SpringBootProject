import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authservice } from '../../service/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: Authservice,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

onSubmit(): void {
  if (this.loginForm.invalid) return;

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe({
    next: (response) => {
      if (response.token) {
        // token এবং role localStorage-এ already save হচ্ছে authService.login() থেকে
        const role = this.authService.getUserRole(); 

        this.successMessage = 'Login successful!';
        this.errorMessage = null;

        // Role-based redirect
        if (role === 'CUSTOMER') {
          this.router.navigate(['/home']);
        } else if (role === 'HOTEL_ADMIN') {
          this.router.navigate(['/addhotel']);
        } else if (role === 'ADMIN') {
          this.router.navigate(['/addlocation']);
        } else {
          this.router.navigate(['/']); // fallback
        }

      } else {
        this.errorMessage = response.message || 'Login failed.';
        this.successMessage = null;
      }
    },
    error: (err) => {
      this.errorMessage = 'Login failed. Please check your credentials.';
      this.successMessage = null;
    }
  });
}

}
