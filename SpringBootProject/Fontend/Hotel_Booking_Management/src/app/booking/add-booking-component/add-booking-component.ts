import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../model/room.model';
import { BookingService } from '../../service/booking-service';
import { RoomService } from '../../service/room-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../model/booking.model';

@Component({
  selector: 'app-add-booking-component',
  standalone: false,
  templateUrl: './add-booking-component.html',
  styleUrl: './add-booking-component.css'
})
export class AddBookingComponent implements OnInit {

  bookingForm!: FormGroup;
  selectedRoom!: Room;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('roomId'));

    // Load selected room
    this.roomService.getRoomById(roomId).subscribe(room => {
      this.selectedRoom = room;
      this.initForm();
    });
  }

  private initForm(): void {
    this.bookingForm = this.fb.group({
      contractPersonName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      numberOfRooms: [1, [Validators.required, Validators.min(1)]],
      advanceAmount: [0, [Validators.min(0)]],
      totalAmount: [{ value: 0, disabled: true }],
      dueAmount: [{ value: 0, disabled: true }],

      customerdto: this.fb.group({
        name: [''],
        email: [''],
        phone: [''],
        address: ['']
      }),

      hoteldto: this.fb.group({
        name: [''],
        location: ['']
      }),

      roomdto: this.fb.group({
        roomType: [this.selectedRoom.roomType],
        price: [this.selectedRoom.price],
        adults: [this.selectedRoom.adults],
        children: [this.selectedRoom.children],
        bookedRooms: [0]
      })
    });


    this.bookingForm.valueChanges.subscribe(() => this.calculateAmounts());
  }

  // 🔹 Total, Due, Advance Calculation
  private calculateAmounts(): void {
    const numberOfRooms = this.bookingForm.get('numberOfRooms')?.value || 0;
    const roomPrice = this.bookingForm.get('roomdto.price')?.value || 0;
    let advance = this.bookingForm.get('advanceAmount')?.value || 0;

    const checkIn = new Date(this.bookingForm.get('checkIn')?.value);
    const checkOut = new Date(this.bookingForm.get('checkOut')?.value);

    let nights = 0;
    if (checkIn && checkOut && checkOut > checkIn) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const total = numberOfRooms * roomPrice * nights;

    // Prevent advance > total
    if (advance > total) {
      advance = total;
    }

    const due = total - advance;

    this.bookingForm.patchValue(
      {
        totalAmount: total,
        dueAmount: due,
        advanceAmount: advance
      },
      { emitEvent: false }
    );
  }

  // 🔹 Booking Submit
  bookRoom(): void {
    if (this.bookingForm.invalid) {
      alert('Please fill all required fields correctly!');
      return;
    }

    const booking: Booking = this.bookingForm.getRawValue();
    console.log('Booking Data:', booking);

    // Room availability check
    if (booking.numberOfRooms > this.selectedRoom.totalRooms) {
      alert('Not enough rooms available!');
      return;
    }

    // Advance validation
    if (booking.advanceAmount > booking.totalAmount) {
      alert('Advance amount cannot exceed total amount!');
      return;
    }

    // Save booking
    this.bookingService.createBooking(booking).subscribe({
      next: (res) => {

        const updatedRoom: Room = {
          ...this.selectedRoom,
          availableRooms: (this.selectedRoom.availableRooms || 0) - booking.numberOfRooms,
          bookedRooms: (this.selectedRoom.bookedRooms || 0) + booking.numberOfRooms
        };

        // Use the id from selectedRoom
        const roomId = this.selectedRoom.id!;

        this.roomService.updateRoom(roomId, updatedRoom).subscribe({
          next: () => {
            alert('Room availability updated successfully!');
          },
          error: (err) => {
            console.error(err);
            alert('Failed to update room!');
          }
        });
      },
      error: (err) => {
        console.error(err);
        alert('Booking failed!');
      }
    });
  }



}
