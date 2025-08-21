import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { Room } from '../../model/room.model';
import { RoomService } from '../../service/room-service';
import { HotelService } from '../../service/hotel.service';

@Component({
  selector: 'app-view-room-component',
  standalone: false,
  templateUrl: './view-room-component.html',
  styleUrl: './view-room-component.css'
})
export class ViewRoomComponent implements OnInit {


  rooms: any[] = [];
  filteredRooms: any[] = [];
  hotels: any[] = [];
  selectedHotelId?: number;

  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private roomService: RoomService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadHotels();
    this.loadRooms();
  }

  loadHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => this.hotels = data,
      error: (err) => console.error('Hotel loading error', err)
    });
  }

  loadRooms() {
    this.loading = true;
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        this.filterRooms();  // ensure filter on load
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Failed to load rooms';
        this.loading = false;
      }
    });
  }

  onHotelChange() {
    this.filterRooms();
  }

  filterRooms() {
    if (this.selectedHotelId != null) {
      const selectedId = Number(this.selectedHotelId); // ensure number
      this.filteredRooms = this.rooms.filter(r => Number(r.hotelDTO?.id) === selectedId);
    } else {
      this.filteredRooms = this.rooms;
    }
  }

}


