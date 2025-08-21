import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { Room } from '../../model/room.model';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../service/hotel.service';

@Component({
  selector: 'app-hotel-details-compononent',
  standalone: false,
  templateUrl: './hotel-details-compononent.html',
  styleUrl: './hotel-details-compononent.css'
})
export class HotelDetailsCompononent implements OnInit {

  hotel: Hotel | null = null;
  rooms: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const hotelId = Number(this.route.snapshot.paramMap.get('id'));
    if (hotelId) {
      this.loadHotelDetails(hotelId);
    }
  }

  loadHotelDetails(hotelId: number) {
    this.loading = true;
    this.hotelService.getHotelById(hotelId).subscribe({
      next: (data) => {
        this.hotel = data;
        this.loadRooms(hotelId);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching hotel:', err);
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }

  loadRooms(hotelId: number) {
    this.hotelService.getRoomsByHotel(hotelId).subscribe({
      next: (data) => {
        this.rooms = data;
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });
  }
}
