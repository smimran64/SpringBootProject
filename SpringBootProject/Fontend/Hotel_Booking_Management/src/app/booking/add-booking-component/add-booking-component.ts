import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../model/room.model';
import { BookingService } from '../../service/booking-service';
import { RoomService } from '../../service/room-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../model/booking.model';
import { Customerservice } from '../../service/customerservice';
import { Customer } from '../../model/customer.model';
import { Hotel } from '../../model/hotel.model';
import { HotelService } from '../../service/hotel.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-add-booking-component',
  standalone: false,
  templateUrl: './add-booking-component.html',
  styleUrl: './add-booking-component.css'
})
export class AddBookingComponent implements OnInit {

  bookingForm!: FormGroup;
  rooms: Room[] = [];
  customers: Customer[] = [];
  hotels: Hotel[] = [];
  selectedRoom!: Room;
  totalAmount: number = 0;
  dueAmount: number = 0;
  booking!: Booking;


  hotelId!: number | null;
  roomId!: number | null;
  roomType!: string | null;
  price!: number | null;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomService,
    private customerService: Customerservice,
    private hotelService: HotelService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) { }


  ngOnInit(): void {
    // Initialize form
    this.bookingForm = this.fb.group({
      contractPersonName: [''],
      phone: [''],
      checkIn: [''],
      checkOut: [''],
      numberOfRooms: [1],
      advanceAmount: [0],
      totalAmount: [0],
      dueAmount: [0],
      customerdto: this.fb.group({
        name: [''],
        email: [''],
        phone: [''],
        address: ['']
      }),
      hoteldto: this.fb.group({
        id: [null],
        name: [''],
        address: ['']
      }),
      roomdto: this.fb.group({
        id: [null],
        roomType: [''],
        adults: [0],
        children: [0],
        price: [0]
      })
    });

    if (isPlatformBrowser(this.platformId)) {
      const pendingBooking = localStorage.getItem('pendingBooking');
      if (pendingBooking) {
        const room: Room = JSON.parse(pendingBooking);

        this.selectedRoom = room;

        this.bookingForm.patchValue({
          hoteldto: {
            id: room.hotelDTO?.id || null,       // <-- safe access
            name: room.hotelDTO?.name || '',
            address: room.hotelDTO?.address || ''
          },
          roomdto: {
            id: room.id || null,
            roomType: room.roomType || '',
            adults: room.adults || 0,
            children: room.children || 0,
            price: room.price || 0
          },
          numberOfRooms: 1,
          advanceAmount: 0
        });

        this.calculateAmounts();
      }
    }

    this.bookingForm.valueChanges.subscribe(() => {
      this.calculateAmounts();
    });


  }







  calculateAmounts() {
    if (!this.selectedRoom) return;

    const numberOfRooms = this.bookingForm.get('numberOfRooms')?.value || 1;
    const checkIn = new Date(this.bookingForm.get('checkIn')?.value);
    const checkOut = new Date(this.bookingForm.get('checkOut')?.value);
    const discount = this.bookingForm.get('discountRate')?.value || 0;
    const advance = this.bookingForm.get('advanceAmount')?.value || 0;

    // Check valid dates
    const diffTime = checkOut.getTime() - checkIn.getTime();
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) diffDays = 1;

    // Check room availability
    // if (this.selectedRoom.availableRooms? <  Booking['numberOfRooms']>) {
    //   this.totalAmount = 0;
    //   this.dueAmount = 0;
    //   return;
    // }

    let total = this.selectedRoom.price * numberOfRooms * diffDays;
    if (discount > 0) {
      total = total - (total * discount / 100);
    }

    this.totalAmount = total;
    this.dueAmount = total - advance;
  }

  submitBooking() {
    if (this.bookingForm.invalid) return;

    const booking: Booking = {
      contractPersonName: this.bookingForm.get('contractPersonName')?.value,
      phone: this.bookingForm.get('phone')?.value,
      checkIn: this.bookingForm.get('checkIn')?.value,
      checkOut: this.bookingForm.get('checkOut')?.value,
      numberOfRooms: this.bookingForm.get('numberOfRooms')?.value,
      discountRate: this.bookingForm.get('discountRate')?.value || 0,
      advanceAmount: this.bookingForm.get('advanceAmount')?.value || 0,
      totalAmount: this.totalAmount,
      dueAmount: this.dueAmount,
      roomId: this.bookingForm.get('roomdto.id')?.value,
      hotelId: this.bookingForm.get('hoteldto.id')?.value,
      customerId: this.bookingForm.get('customerdto.id')?.value // if you have logged-in user
    };


    this.bookingService.createBooking(booking).subscribe({
      next: res => {
        alert('Booking Created Successfully!');
        // Update room availability locally
        // this.selectedRoom.availableRooms -= booking.numberOfRooms;
        // this.selectedRoom.bookedRooms += booking.numberOfRooms;

        // Reset form
        this.bookingForm.reset({ numberOfRooms: 1, discountRate: 0, advanceAmount: 0 });
        this.totalAmount = 0;
        this.dueAmount = 0;
      },
      error: err => {
        alert(err.error?.message || 'Error creating booking');
      }
    });
  }


}
