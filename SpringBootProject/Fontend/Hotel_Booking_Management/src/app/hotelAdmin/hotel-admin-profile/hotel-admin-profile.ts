import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HotelAdmin } from '../../model/hotelAdmin.model';
import { HotelAdminService } from '../../service/hotel-admin-service';

@Component({
  selector: 'app-hotel-admin-profile',
  standalone: false,
  templateUrl: './hotel-admin-profile.html',
  styleUrl: './hotel-admin-profile.css'
})
export class HotelAdminProfile implements OnInit {

  profile: HotelAdmin | null = null;
  hotels: any[] = [];
  hotelInfo: any = null;
  amenities: any = null;

  activeTab: string = 'hotels'; // default tab

  constructor(
    private hotelAdminService: HotelAdminService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.hotelAdminService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        console.log('Profile loaded:', res);
        this.cdr.detectChanges(); // optional, only if needed
      }
    });
  }

  loadHotels() {
    if (!this.profile) return;
    this.activeTab = 'hotels';
    this.hotelAdminService.getMyHotels().subscribe({
      next: (res) => {
        this.hotels = res;
        console.log('Hotels loaded:', res);
      }
    });
  }

  loadHotelInfo() {
    this.activeTab = 'hotelInfo';    
    if (this.hotels.length === 0) return;
    const hotelId = this.hotels[0].id;
    this.hotelAdminService.getHotelInfoByHotelId(hotelId).subscribe({
      next: (res) => {
        this.hotelInfo = res;
        console.log('Hotel Info loaded:', res);
      }
    });
  }

  loadAmenities() {
    this.activeTab = 'amenities';
    if (this.hotels.length === 0) return;
    const hotelId = this.hotels[0].id;
    this.hotelAdminService.getHotelAmenitiesByHotelId(hotelId).subscribe({
      next: (res) => {
        this.amenities = res;
        console.log('Amenities loaded:', res);
      },
      error: (err) => console.error(err)
    });
  }

}
