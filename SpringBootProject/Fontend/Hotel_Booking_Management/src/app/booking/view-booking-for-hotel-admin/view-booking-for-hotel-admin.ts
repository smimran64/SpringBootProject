import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { HotelService } from '../../service/hotel.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-booking-for-hotel-admin',
  standalone: false,
  templateUrl: './view-booking-for-hotel-admin.html',
  styleUrl: './view-booking-for-hotel-admin.css'
})
export class ViewBookingForHotelAdmin implements OnInit {

  hotels: Hotel[] = [];
  selectedHotelId: number | null = null;
  bookings: any[] = [];

  loading = false;
  errorMessage: string | null = null;

  constructor(
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadHotels();
  }


  private loadHotels(): void {
    this.loading = true;

    this.hotelService.getMyHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Hotel loading error', err);
        this.errorMessage = 'Failed to load hotels';
        this.loading = false;
      }
    });
  }

  onHotelChange() {
    if (this.selectedHotelId) {
      this.http.get<any[]>(`http://localhost:8082/api/booking/hotel/${this.selectedHotelId}`)
        .subscribe({
          next: (data) => {
            this.bookings = data;
            this.cdr.markForCheck();
          },
          error: (err) => console.error('Error loading bookings', err)
        });
    } else {
      this.bookings = [];
    }
  }

}
