import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-component',
  standalone: false,
  templateUrl: './forgot-password-component.html',
  styleUrl: './forgot-password-component.css'
})
export class ForgotPasswordComponent {


   email: string = '';
  message: string = '';

  constructor(
    private http: HttpClient,
    
    private cdr:ChangeDetectorRef,
    private router: Router

  ) { }

  sendResetLink() {
    const formData = new URLSearchParams();
    formData.set('email', this.email);

    this.http.post('http://localhost:8082/api/user/forgot-password', formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .subscribe({
        next: (res: any) => {
          this.message = ('Reset link sent successfully' + res.message);          
          this.cdr.markForCheck();
        },
        error: (err: any) => {
          this.message = 'Error sending reset link';
          
        }
      });

  }

}
