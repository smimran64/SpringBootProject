import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer } from '../../model/customer.model';
import { Customerservice } from '../../service/customerservice';

@Component({
  selector: 'app-customer-profile-component',
  standalone: false,
  templateUrl: './customer-profile-component.html',
  styleUrl: './customer-profile-component.css'
})
export class CustomerProfileComponent implements OnInit {


    profile: Customer | null = null;
    customer: any[] = [];


    constructor(

      private customerService: Customerservice,
      private cdr: ChangeDetectorRef


    ){}


  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.customerService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        console.log('Profile loaded:', res);        
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  

  

}
