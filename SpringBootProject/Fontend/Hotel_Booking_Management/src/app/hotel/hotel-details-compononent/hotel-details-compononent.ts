import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { ActivatedRoute, Route, RouteConfigLoadEnd, Router } from '@angular/router';
import { HotelService } from '../../service/hotel.service';
import { forkJoin } from 'rxjs';

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
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const hotelId = Number(params.get('id'));
    if (hotelId) {
      this.loadHotelWithRooms(hotelId);
     
    }
  });
}

  loadHotelWithRooms(hotelId: number) {
    this.loading = true;
    this.hotel = null;
    this.rooms = [];

    forkJoin({
      hotel: this.hotelService.getHotelById(hotelId),
      rooms: this.hotelService.getRoomsByHotel(hotelId)
    }).subscribe({
      next: ({ hotel, rooms }) => {
        this.hotel = hotel;
        this.rooms = rooms;
        this.cd.markForCheck();
        this.loading = false;
        
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }

  bookRoom(room: any) {
    this.router.navigate(['/booking'], {
      queryParams: {
        hotelId: this.hotel?.id,
        roomType: room.roomType,
        price: room.price
      }
    });
  }

}
