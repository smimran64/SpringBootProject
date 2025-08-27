import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../model/room.model';
import { BookingService } from '../../service/booking-service';
import { RoomService } from '../../service/room-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../model/booking.model';
import { Customerservice } from '../../service/customerservice';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-add-booking-component',
  standalone: false,
  templateUrl: './add-booking-component.html',
  styleUrl: './add-booking-component.css'
})
export class AddBookingComponent implements OnInit {

  bookingForm!: FormGroup;
  selectedRoom!: Room;

  customer!: any;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomService,
    private customerService: Customerservice,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('id'));

    console.log(roomId + "  :::11111111111111111")
    this.roomService.getRoomById(roomId).subscribe(room => {
      this.selectedRoom = room;
      console.log(room);
      this.initForm();
      this.loadCustomerDetails();
      this.cdr.markForCheck();
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

      // customerdto: this.fb.group({
      //   id: [''], // 
      //   name: [''],
      //   email: [''],
      //   phone: [''],
      //   address: ['']
      // }),

      hoteldto: this.fb.group({
        id: [this.selectedRoom.hotelDTO.id],
        name: [this.selectedRoom.hotelDTO.name],
        location: [this.selectedRoom.hotelDTO.address]
      }),

      roomdto: this.fb.group({
        id: [this.selectedRoom.id],
        roomType: [this.selectedRoom.roomType],
        price: [this.selectedRoom.price],
        adults: [this.selectedRoom.adults],
        children: [this.selectedRoom.children],
        bookedRooms: [0]
      })
    });

    this.bookingForm.valueChanges.subscribe(() => this.calculateAmounts());
  }

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

  bookRoom(): void {
    if (this.bookingForm.invalid) {

      alert('Please fill all required fields correctly!');
      return;
    }

    const booking: Booking = this.bookingForm.getRawValue();


    if (booking.numberOfRooms > (this.selectedRoom.availableRooms || 0)) {
      alert('Not enough rooms available!');
      return;
    }

    if (booking.advanceAmount > booking.totalAmount) {
      alert('Advance amount cannot exceed total amount!');
      return;
    }

    this.bookingService.createBooking(booking).subscribe({
      next: (res) => {
        const updatedRoom: Room = {
          ...this.selectedRoom,
          availableRooms: (this.selectedRoom.availableRooms || 0) - booking.numberOfRooms,
          bookedRooms: (this.selectedRoom.bookedRooms || 0) + booking.numberOfRooms
        };

        this.roomService.updateRoom(this.selectedRoom.id!, updatedRoom).subscribe({
          next: () => {
            alert('Booking successful and room availability updated!');
            this.router.navigate(['/bookings']);
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error(err);
            alert('Failed to update room availability!');
          }
        });
      },
      error: (err) => {
        console.error(err);
        alert('Booking failed!');
      }
    });
  }


  loadCustomerDetails(): void {

    this.customerService.getProfile().subscribe({
      next: (data) => {

        this.customer = data;
        console.log(data + "+++++++++++++++");
        this.bookingForm.patchValue({
          customerdto: {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address
          }
        });

      },
      error: (err) => {

        console.log("Customer Details Loaded Failed")

      }
    })
  }

}
