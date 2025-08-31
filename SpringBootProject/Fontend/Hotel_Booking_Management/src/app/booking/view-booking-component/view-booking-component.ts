import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { Booking } from '../../model/booking.model';
import { BookingService } from '../../service/booking-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-booking-component',
  standalone: false,
  templateUrl: './view-booking-component.html',
  styleUrl: './view-booking-component.css'
})
export class ViewBookingComponent implements OnInit {

  hotels: any[] = [];
  selectedHotelId: number | null = null;
  bookings: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef


  ) { }


  ngOnInit(): void {
    this.loadHotels();
  }


  loadHotels() {
    this.http.get<any[]>('http://localhost:8082/api/hotel/all')
      .subscribe({
        next: (res) => {
          this.hotels = res;
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Error loading hotels', err)
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
