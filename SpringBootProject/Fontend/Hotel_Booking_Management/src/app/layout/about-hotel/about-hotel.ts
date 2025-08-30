import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { RoomService } from '../../service/room-service';
import { environments } from '../../../environments/environments';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about-hotel',
  standalone: false,
  templateUrl: './about-hotel.html',
  styleUrl: './about-hotel.css'
})
export class AboutHotel implements OnInit {

  searchForm!: FormGroup;
  locations: any[] = [];
  hotels: any[] = [];
  searched: boolean = false;
  selectedHotel: any;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private hotelService: HotelService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private roomService: RoomService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // form initialize
    this.searchForm = this.fb.group({
      locationId: [''],
      checkIn: [''],
      checkOut: ['']
    });

    // load all locations
    this.locationService.getAllLocationsForHome().subscribe(data => {
      this.locations = data;
      console.log(data + "Location");
      this.cdr.markForCheck();
    });
  }

  // search hotels
  onSearch() {
    const { locationId, checkIn, checkOut } = this.searchForm.value;

    localStorage.setItem('checkin', JSON.stringify(checkIn));
    localStorage.setItem('checkout', JSON.stringify(checkOut));
    this.hotelService.searchHotelhome(locationId, checkIn, checkOut).subscribe(data => {
      this.hotels = data;
      console.log(data + "Hotel");
      this.searched = true;
      this.cdr.markForCheck();
    });
  }

  // navigate to hotel details
  viewHotel(hotelId: number) {
    this.roomService.getRoomsByHotelId(hotelId).subscribe({
      next: (hotelData) => {
        this.selectedHotel = hotelData;
        this.router.navigate(['/hotel-details', hotelId]);

      },
      error: (err) => {
        console.error('Failed to fetch hotel details', err);
        // Optionally show an error message
      }
    });
  }


  placeholder = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop';

  getHotelImage(h: any): string {

    if (h?.image) {

      return `${environments.apiUrl}/images/hotels/${h.image}`;
    }
    return this.placeholder;
  }

  imgFallback(ev: Event) {
    const target = ev.target as HTMLImageElement;
    target.src = this.placeholder;
  }

  trackById = (_: number, item: any) => item.id;

}
