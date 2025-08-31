import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password-component',
  standalone: false,
  templateUrl: './reset-password-component.html',
  styleUrl: './reset-password-component.css'
})
export class ResetPasswordComponent {


   token: string = '';
  newPassword: string = '';
  message: string = '';


// constructor(private http:HttpClient,
//   private alertService:AlertService,
//   private cdr:ChangeDetectorRef
// ){}


  constructor(
    private http: HttpClient,
     private route: ActivatedRoute
   
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  resetPassword() {
    const formData = new URLSearchParams();
    formData.set('token', this.token);
    formData.set('newPassword', this.newPassword);

    this.http.post('http://localhost:8082/api/user/reset-password', formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe({
      next: (res: any) =>{
        this.message =("Password Reset successfully" +  res.message);
        
        // this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.message = err.error?.message || 'Error resetting password';
        
      }
    });
  }

}
