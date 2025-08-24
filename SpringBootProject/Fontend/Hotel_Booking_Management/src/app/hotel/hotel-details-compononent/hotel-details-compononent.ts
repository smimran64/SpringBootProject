import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { ActivatedRoute, Route, RouteConfigLoadEnd, Router } from '@angular/router';
import { HotelService } from '../../service/hotel.service';
import { forkJoin } from 'rxjs';
import { HotelAmenities } from '../../model/hotelAmenities.model';
import { HotelAmenitiesService } from '../../service/hotel-amenities.service';
import { HotelInfo } from '../../model/hotelInfo.model';
import { HotelInfoService } from '../../service/hotel-info.service';

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
  amenities: HotelAmenities | null = null;
  hotelInfo: HotelInfo | null = null;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private hotelAmenitiesService: HotelAmenitiesService,
    private hotelInfoService: HotelInfoService,
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
    this.amenities = null;
    this.hotelInfo = null;

    forkJoin({
      hotel: this.hotelService.getHotelById(hotelId),
      rooms: this.hotelService.getRoomsByHotel(hotelId),
      amenities: this.hotelAmenitiesService.getAmenitiesByHotelId(hotelId),
      info: this.hotelInfoService.getHotelInfoByHotelId(hotelId)
    }).subscribe({
      next: ({ hotel, rooms, amenities, info }) => {
        this.hotel = hotel;
        this.rooms = rooms;
        this.amenities = amenities;
        this.hotelInfo = info;
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
    this.router.navigate(['/addbooking', room.id], {
      queryParams: {
        hotelId: this.hotel?.id,
        roomType: room.roomType,
        price: room.price
      }
    });
  }

}
