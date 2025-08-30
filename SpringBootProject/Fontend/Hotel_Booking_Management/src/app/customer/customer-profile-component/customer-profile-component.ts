import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer } from '../../model/customer.model';
import { Customerservice } from '../../service/customerservice';
import { BookingService } from '../../service/booking-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-profile-component',
  standalone: false,
  templateUrl: './customer-profile-component.html',
  styleUrl: './customer-profile-component.css'
})
export class CustomerProfileComponent implements OnInit {


  profile: Customer | null = null;
  bookings: any[] = [];

  constructor(
    private customerService: Customerservice,
    private cdr: ChangeDetectorRef,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.customerService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        console.log('Profile loaded:', res);
        this.loadBookings(res.id);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  loadBookings(customerId: number): void {
    this.bookingService.getBookingsByCustomerId(customerId).subscribe({
      next: (data) => {
        // latest booking first (sort by checkin date descending)
         console.log("Raw booking data:", data);
        this.bookings = data.sort((a: any, b: any) => {
          return new Date(b.checkin).getTime() - new Date(a.checkin).getTime();
        });

        console.log('Bookings loaded:', this.bookings);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load bookings:', err);
      }
    });
  }





}
