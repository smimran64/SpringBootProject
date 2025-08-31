import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../model/hotel.model';
import { RoomService } from '../../service/room-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-room-for-admin',
  standalone: false,
  templateUrl: './view-room-for-admin.html',
  styleUrl: './view-room-for-admin.css'
})
export class ViewRoomForAdmin implements OnInit {

 hotels: any[] = [];
  rooms: any[] = [];
  selectedHotelId: number | null = null;

  constructor(private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels() {
    this.http.get<any[]>('http://localhost:8082/api/hotel/all')
      .subscribe(res => this.hotels = res);
      this.cd.markForCheck();
  }

  onHotelChange() {
    if (this.selectedHotelId) {
      this.http.get<any[]>(`http://localhost:8082/api/room/hotell/${this.selectedHotelId}`)
        .subscribe({
          next:(res) => {
            this.rooms = res;
            this.cd.markForCheck();
          },
          error: (err) => {
            console.error('Room loading error', err);
          }
        });
       
    } else {
      this.rooms = [];
    }
  }



}
