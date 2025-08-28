import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { ActivatedRoute, Route, RouteConfigLoadEnd, Router } from '@angular/router';
import { HotelService } from '../../service/hotel.service';
import { forkJoin } from 'rxjs';
import { HotelAmenities } from '../../model/hotelAmenities.model';
import { HotelAmenitiesService } from '../../service/hotel-amenities.service';
import { HotelInfo } from '../../model/hotelInfo.model';
import { HotelInfoService } from '../../service/hotel-info.service';
import { Authservice } from '../../service/authservice';
import { HotelPhotoService } from '../../service/hotel-photo.service';
import { HotelPhotoDTO } from '../../model/hotelPhoto.model';
import { isPlatformBrowser } from '@angular/common';
import { Room } from '../../model/room.model';

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
  role!: string | null;
  photos: HotelPhotoDTO[] = [];

  maxVisiblePhotos: number = 4; // max photos to show in gallery card
  showModal: boolean = false;
  modalPhotos: HotelPhotoDTO[] = [];

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private hotelAmenitiesService: HotelAmenitiesService,
    private hotelInfoService: HotelInfoService,
    private authService: Authservice,
    private hotelPhotoService: HotelPhotoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.getRole();

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
    this.photos = [];




    forkJoin({
      hotel: this.hotelService.getHotelByIdpublic(hotelId),
      rooms: this.hotelService.getRoomsByHotelpublic(hotelId),
      amenities: this.hotelAmenitiesService.getAmenitiesByHotelIdpublic(hotelId),
      info: this.hotelInfoService.getHotelInfoByHotelIdpublic(hotelId),
      photos: this.hotelPhotoService.getPhotosByHotelPublic(hotelId)
    }).subscribe({
      next: ({ hotel, rooms, amenities, info, photos }) => {
        this.hotel = hotel;
        this.rooms = rooms;
        this.amenities = amenities;
        this.hotelInfo = info;
        this.photos = photos;
        this.cd.markForCheck();
        this.loading = false;

      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }

  // bookRoom(room: any) {


  //   if (this.authService.isLoggIn()) {
  //     this.router.navigate(['/addbooking', room.id], {
  //       queryParams: {
  //         hotelId: this.hotel?.id,
  //         roomType: room.roomType,
  //         price: room.price
  //       }
  //     });

  //   }

  //   else {
  //     this.router.navigate(['/login']);

  //   }



  // }



  // bookRoom(room: any) {
  //   if (this.authService.isLoggIn()) {
  //     this.router.navigate(['/addbooking', room.id], {


  //       queryParams: {
  //         hotelId: this.hotel?.id,
  //         roomType: room.roomType,
  //         price: room.price
  //       }
  //     });
  //   } else {
  //     // Save redirect URL to localStorage (or service)
  //     const redirectUrl = this.router.createUrlTree(
  //       ['/addbooking', room.id],
  //       {
  //         queryParams: {
  //           hotelId: this.hotel?.id,
  //           roomType: room.roomType,
  //           price: room.price
  //         }
  //       }
  //     ).toString();

  //     localStorage.setItem('redirectUrl', redirectUrl);

  //     this.router.navigate(['/login']);
  //   }
  // }



  bookRoom(room: Room) {
    if (isPlatformBrowser(this.platformId)) {

          // Save the entire room object in localStorage

      localStorage.setItem('pendingBooking', JSON.stringify(room));

      if (this.authService.isLoggIn()) {

            // User logged in → navigate directly to booking page

        this.router.navigate(['/addbooking', room.id]);
      } else {

          // User not logged in → navigate to login page
          
        this.router.navigate(['/login']);
      }
    }
  }

  getRole(): void {
    this.role = localStorage.getItem('userRole');
  }


  openModal() {
    this.modalPhotos = this.photos;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getVisiblePhotos(): HotelPhotoDTO[] {
    return this.photos.slice(0, this.maxVisiblePhotos);
  }

  getExtraCount(): number {
    return this.photos.length - this.maxVisiblePhotos;
  }


}
