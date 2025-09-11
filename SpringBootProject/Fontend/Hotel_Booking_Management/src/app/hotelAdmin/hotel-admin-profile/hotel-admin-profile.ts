import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HotelAdmin } from '../../model/hotelAdmin.model';
import { HotelAdminService } from '../../service/hotel-admin-service';
import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../model/hotel.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel-admin-profile',
  standalone: false,
  templateUrl: './hotel-admin-profile.html',
  styleUrls: ['./hotel-admin-profile.css'] // FIXED: changed from styleUrl to styleUrls
})
export class HotelAdminProfile implements OnInit {

  id!: number;

  profile: HotelAdmin | null = null;
  hotels: Hotel[] = [];

  constructor(
    private hotelAdminService: HotelAdminService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idParam = this.router.snapshot.paramMap.get('id');

    if (idParam && !isNaN(+idParam)) {
      this.id = +idParam;
    } else {
      this.id = 0;
    }

    this.loadProfile();
  }

  loadProfile(): void {
    if (this.id === 0) {
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
    } else {
      this.hotelAdminService.getHotelAdminById(this.id).subscribe({
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
