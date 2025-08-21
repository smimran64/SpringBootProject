import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { Room } from '../../model/room.model';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../service/hotel.service';
import { forkJoin } from 'rxjs';
import { RoomService } from '../../service/room-service';

@Component({
  selector: 'app-hotel-details-compononent',
  standalone: false,
  templateUrl: './hotel-details-compononent.html',
  styleUrl: './hotel-details-compononent.css'
})
export class HotelDetailsCompononent implements OnInit {

  hotel: any;
  rooms: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const hotelId = +this.route.snapshot.paramMap.get('id')!;  // get from route param
    console.log(hotelId + "+++++++++++++++++++++++++++");
    forkJoin({
      hotel: this.hotelService.getHotelById(hotelId),
      rooms: this.roomService.getRoomsByHotelId(hotelId)
    }).subscribe({
      next: (result) => {
        this.hotel = result.hotel;
        this.rooms = result.rooms;
        this.cd.markForCheck();
        this.loading = false;   // stop loading
      },
      error: (err) => {
        console.error('Error loading hotel data:', err);
        this.loading = false;
      }
    });
  }
}
