import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../service/room-service';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../model/room.model';
import { Hotel } from '../../model/hotel.model';

@Component({
  selector: 'app-add-room-component',
  standalone: false,
  templateUrl: './add-room-component.html',
  styleUrl: './add-room-component.css'
})
export class AddRoomComponent implements OnInit {


  roomForm: FormGroup;
  hotels: Hotel[] = [];
  selectedImage?: File;
  message = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private hotelService: HotelService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.roomForm = this.fb.group({
      roomType: ['', Validators.required],
      totalRooms: [0, [Validators.required, Validators.min(1)]],
      adults: [0, [Validators.required, Validators.min(1)]],
      children: [0, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      hotelId: [null, Validators.required]
    });
  }

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
        this.message = 'Failed to load hotels';
        this.loading = false;
      }
    });
  }

    onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  saveRoom(): void {
    if (this.roomForm.invalid) {
      this.message = 'Please fill all required fields correctly.';
      return;
    }

    const room: Room = {
      roomType: this.roomForm.value.roomType,
      totalRooms: this.roomForm.value.totalRooms,
      adults: this.roomForm.value.adults,
      children: this.roomForm.value.children,
      price: this.roomForm.value.price,
      hotelDTO: { id: this.roomForm.value.hotelId }
    };

    this.roomService.saveRoom(room, this.selectedImage).subscribe({
      next: () => {
        alert('Room saved successfully');
        this.router.navigate(['/allroom']);
      },
      error: (err) => {
        console.error('Room save error:', err);
        if (err.status === 403) {
          this.message = 'You are not authorized. Please login again.';
        } else if (err.status === 500 && err.error.includes('Role')) {
          this.message = 'Server Role mapping issue. Contact admin.';
        } else {
          this.message = err?.error || 'Room save failed';
        }
      }
    });
  }



  updateRoom(id: number): void {
    if (this.roomForm.invalid) {
      this.message = 'All fields are required';
      return;
    }

    const room: Room = {
      roomType: this.roomForm.value.roomType,
      totalRooms: this.roomForm.value.totalRooms,
      adults: this.roomForm.value.adults,
      children: this.roomForm.value.children,
      price: this.roomForm.value.price,
      hotelDTO: {
        id: this.roomForm.value.hotelId,
        name: '',      // optional
        address: '',   // optional
        rating: 0,     // optional
        image: ''      // optional
      }
    };


    this.roomService.updateRoom(id, room, this.selectedImage).subscribe({
      next: () => {
        alert('Room updated successfully');
        this.router.navigate(['/rooms']);
      },
      error: (err) => {
        console.error(err);
        this.message = err?.error || 'Room update failed';
      }
    });
  }

  deleteRoom(id: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => alert('Room deleted successfully'),
        error: (err) => {
          console.error(err);
          this.message = 'Room delete failed';
        }
      });
    }
  }


}
