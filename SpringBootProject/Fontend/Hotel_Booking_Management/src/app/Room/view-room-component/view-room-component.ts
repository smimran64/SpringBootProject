import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoomService } from '../../service/room-service';
import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../model/hotel.model';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-view-room-component',
  standalone: false,
  templateUrl: './view-room-component.html',
  styleUrl: './view-room-component.css'
})
export class ViewRoomComponent implements OnInit {


  rooms: any[] = [];
  filteredRooms: any[] = [];
  hotels: Hotel[] = [];
  selectedHotelId!: number;


  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private roomService: RoomService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {    

    const hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.selectedHotelId = hotelId;
    this.loadHotels();
    this.loadRooms(hotelId);
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

  loadRooms(hotelId: number): void {
    this.loading = true;
    this.roomService.getRoomsByHotelId(hotelId).subscribe({
      next: (data) => {
        this.rooms = data;
         this.filterRooms(hotelId); //  Add this line
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Failed to load rooms';
        this.loading = false;
      }
    });
  }

  onHotelChange(hotelId: number): void {
    if (hotelId) {
      this.loadRooms(hotelId);
    } else {
      this.filteredRooms = [];
    }
  }

  filterRooms(hotelId: number): void {
    this.filteredRooms = this.rooms.filter(
      r => Number(r.hotelDTO?.id) === hotelId
      
    );
  }

  // loadRooms() {
  //   this.loading = true;
  //   this.roomService.getAllRooms().subscribe({
  //     next: (data) => {
  //       this.rooms = data;
  //       this.filterRooms();  // ensure filter on load
  //       this.loading = false;
  //       this.cdr.markForCheck();
  //     },
  //     error: () => {
  //       this.errorMessage = 'Failed to load rooms';
  //       this.loading = false;
  //     }
  //   });
  // }

  // onHotelChange() {
  //   this.filterRooms();
  // }

  // filterRooms() {
  //   if (this.selectedHotelId != null) {
  //     const selectedId = Number(this.selectedHotelId); // ensure number
  //     this.filteredRooms = this.rooms.filter(r => Number(r.hotelDTO?.id) === selectedId);
  //   } else {
  //     this.filteredRooms = this.rooms;
  //   }
  // }

}


