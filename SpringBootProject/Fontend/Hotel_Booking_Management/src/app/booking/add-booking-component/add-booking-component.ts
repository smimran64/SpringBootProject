import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  booking!: Booking ;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomService,
    private customerService: Customerservice,
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      contractPersonName: ['', Validators.required],
      phone: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      numberOfRooms: [1, [Validators.required, Validators.min(1)]],
      discountRate: [0, [Validators.min(0), Validators.max(100)]],
      advanceAmount: [0, Validators.min(0)],
      customerId: ['', Validators.required],
      hotelId: ['', Validators.required],
      roomId: ['', Validators.required]
    });

    // Load data
    this.loadRooms();
    this.loadCustomers();
    this.loadHotels();

    // Watch changes to recalculate
    this.bookingForm.valueChanges.subscribe(() => {
      this.calculateAmounts();
    });
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (data)=>{
        this.rooms = data;
      },
      error: (err) => {
        console.error('Error loading rooms:', err);
      }
    });
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        console.error('Error loading customers:', err);
      }
    });
  }

  loadHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
      },
      error: (err) => {
        console.error('Error loading hotels:', err);
      }
    });
  }

  onRoomChange(roomId: number) {
    this.selectedRoom = this.rooms.find(r => r.id === +roomId)!;
    this.calculateAmounts();
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
      discountRate: this.bookingForm.get('discountRate')?.value,
      advanceAmount: this.bookingForm.get('advanceAmount')?.value,
      totalAmount: this.totalAmount,
      dueAmount: this.dueAmount,
      roomId: this.bookingForm.get('roomId')?.value,
      hotelId: this.bookingForm.get('hotelId')?.value,
      customerId: this.bookingForm.get('customerId')?.value
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
