import { Component } from '@angular/core';
import { HotelAdmin } from '../../model/hotelAdmin.model';
import { HotelAdminService } from '../../service/hotel-admin-service';

@Component({
  selector: 'app-hotel-admin-profile',
  standalone: false,
  templateUrl: './hotel-admin-profile.html',
  styleUrl: './hotel-admin-profile.css'
})
export class HotelAdminProfile {


  profile: HotelAdmin | null = null;
  hotels: any[] = [];
  hotelInfo: any = null;
  amenities: any = null;

  activeTab: string = 'hotels'; // default tab

  constructor(private hotelAdminService: HotelAdminService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

        //Load HotelAdmin Profile

  loadProfile(): void {
    this.hotelAdminService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        console.log('Profile loaded:', res);
      },
      error: (err) => console.error(err)
    });
  }

        //Load Hotels

  loadHotels() {
    if (!this.profile) return;
    this.activeTab = 'hotels';
    this.hotelAdminService.getMyHotels().subscribe({
      next: (res) => {
        this.hotels = res;
        console.log('Hotels loaded:', res);
      },
      error: (err) => console.error(err)
    });
  }

      //Load Hotel Info

  loadHotelInfo() {
    this.activeTab = 'hotelInfo';    
    if (this.hotels.length === 0) return;
    const hotelId = this.hotels[0].id;
    this.hotelAdminService.getHotelInfoByHotelId(hotelId).subscribe({
      next: (res) => {
        this.hotelInfo = res;
        console.log('Hotel Info loaded:', res);
      },
      error: (err) => console.error(err)
    });
  }

        // Load Amenities

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
