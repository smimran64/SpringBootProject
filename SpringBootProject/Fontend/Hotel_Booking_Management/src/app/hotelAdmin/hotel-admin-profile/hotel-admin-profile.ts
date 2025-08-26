import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HotelAdmin } from '../../model/hotelAdmin.model';
import { HotelAdminService } from '../../service/hotel-admin-service';
import { HotelService } from '../../service/hotel.service';

@Component({
  selector: 'app-hotel-admin-profile',
  standalone: false,
  templateUrl: './hotel-admin-profile.html',
  styleUrls: ['./hotel-admin-profile.css'] // FIXED: changed from styleUrl to styleUrls
})
export class HotelAdminProfile implements OnInit {

  profile: HotelAdmin | null = null;
  hotels: any[] = [];

  constructor(
    private hotelAdminService: HotelAdminService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.hotelAdminService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        console.log('Profile loaded:', res);
        this.loadHotels(res.id);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  loadHotels(adminId: number): void {
    this.hotelService.getHotelByHotelAdminId(adminId).subscribe({
      next: (data) => {
        this.hotels = data;
        this.cdr.markForCheck();
        console.log('Hotels loaded:', data);
      },
      error: (err) => {
        console.error('Failed to load hotels:', err);
      }
    });
  }
}
