import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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


  customerId: number | null = null;


  hotelId!: number | null;
  roomId!: number | null;
  roomType!: string | null;
  price!: number | null;

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
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
        address: [''],
        location: ['']
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
      // room, hotel, customer data localStorage থেকে আনা
      const pendingBooking = localStorage.getItem('pendingBooking');
      const hotelDetails = localStorage.getItem('hotelDetails');
      const customerDetails = localStorage.getItem('customer');
      const checkIn = localStorage.getItem('checkin');
      const checkOut = localStorage.getItem('checkout');

      if (customerDetails) {
        const customer = JSON.parse(customerDetails);
        this.customerId = customer.id || null; // get ID if it exists
      }

      if (pendingBooking) {
        const room: Room = JSON.parse(pendingBooking);
        this.selectedRoom = room;

        this.bookingForm.patchValue({
          roomdto: {
            id: room.id || null,


            roomType: room.roomType || '',
            adults: room.adults || 0,
            children: room.children || 0,
            price: room.price || 0
          },
          numberOfRooms: 1,
          advanceAmount: 0,


        });
      }

      if (hotelDetails) {
        const hotel: Hotel = JSON.parse(hotelDetails);
        this.bookingForm.patchValue({
          hoteldto: {
            id: hotel.id || null,
            name: hotel.name || '',
            address: hotel.address || '',
            location: hotel.location || ''
          }
        });
      }

      if (customerDetails) {
        const customer: Customer = JSON.parse(customerDetails);
        this.bookingForm.patchValue({
          customerdto: {

            id: customer.id || null,
            name: customer.name || '',
            email: customer.email || '',
            phone: customer.phone || '',
            address: customer.address || ''
          }
        });
      }

      if (checkIn) {
        const checkInDate = JSON.parse(checkIn);
        this.bookingForm.patchValue({
          checkIn: checkInDate
        });
      }

      if (checkOut) {
        const checkOutDate = JSON.parse(checkOut);
        this.bookingForm.patchValue({
          checkOut: checkOutDate
        });
      }

      this.calculateAmounts();
    }

    // Auto calculation when form value changes
    this.bookingForm.valueChanges.subscribe(() => {
      this.calculateAmounts();
    });
  }



  calculateAmounts() {
    if (!this.selectedRoom) return;

    const numberOfRooms = this.bookingForm.get('numberOfRooms')?.value || 1;
    const checkInValue = this.bookingForm.get('checkIn')?.value;
    const checkOutValue = this.bookingForm.get('checkOut')?.value;
    const discount = this.bookingForm.get('discountRate')?.value || 0;
    const advance = this.bookingForm.get('advanceAmount')?.value || 0;

    if (!checkInValue || !checkOutValue) {
      this.bookingForm.patchValue({ totalAmount: 0, dueAmount: 0 });
      return;
    }

    const checkIn = new Date(checkInValue);
    const checkOut = new Date(checkOutValue);

    // Check valid dates
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      this.bookingForm.get('checkOut')?.setErrors({ invalidDate: true });
      this.bookingForm.patchValue({ totalAmount: 0, dueAmount: 0 });
      return;
    } else {
      this.bookingForm.get('checkOut')?.setErrors(null);
    }

    // Calculate total
    let total = this.selectedRoom.price * numberOfRooms * diffDays;
    if (discount > 0) {
      total -= total * discount / 100;
    }
    const due = total - advance;

    // Patch values to form
    this.bookingForm.patchValue({
      totalAmount: total,
      dueAmount: due
    });

    // Optional: keep component variables in sync
    this.totalAmount = total;
    this.dueAmount = due;
  }




  submitBooking() {
    if (this.bookingForm.invalid) return;



    const roomId = this.bookingForm.get('roomdto.id')?.value!;
    const hotelId = this.bookingForm.get('hoteldto.id')?.value!;
    


    const cid = this.customerId;




    console.log(this.roomId); // now it will show the correct ID
    console.log(this.hotelId); // now it will show the correct ID
    console.log(this.customerId); // now it will show the correct ID

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

      roomdto: { id: roomId },
      hoteldto: { id: hotelId },
      customerdto: { id: cid! }

    };


    // Log the exact JSON Angular will send
    console.log('Booking payload:', JSON.stringify(booking, null, 2));

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


        this.generateBookingPDF();
        this.router.navigate(['customerProfile'])

      },
      error: err => {
        alert(err.error?.message || 'Error creating booking');
      }
    });
  }


  //   submitBooking() {
  //   if (this.bookingForm.invalid) return;

  //   const booking = {
  //     contractPersonName: this.bookingForm.get('contractPersonName')?.value,
  //     phone: this.bookingForm.get('phone')?.value,
  //     checkIn: this.bookingForm.get('checkIn')?.value,
  //     checkOut: this.bookingForm.get('checkOut')?.value,
  //     numberOfRooms: this.bookingForm.get('numberOfRooms')?.value,
  //     discountRate: this.bookingForm.get('discountRate')?.value || 0,
  //     advanceAmount: this.bookingForm.get('advanceAmount')?.value || 0,
  //     totalAmount: this.totalAmount,
  //     dueAmount: this.dueAmount,
  //     roomdto: { id: this.bookingForm.get('roomdto.id')?.value },
  //     hoteldto: { id: this.bookingForm.get('hoteldto.id')?.value },
  //     customerdto: { id: this.bookingForm.get('customerdto.id')?.value }
  //   };

  //   console.log('Booking payload:', booking);

  //   this.bookingService.createBooking(booking).subscribe({
  //     next: res => {
  //       alert('Booking Created Successfully!');
  //       this.bookingForm.reset({ numberOfRooms: 1, discountRate: 0, advanceAmount: 0 });
  //       this.totalAmount = 0;
  //       this.dueAmount = 0;
  //     },
  //     error: err => {
  //       alert(err.error?.message || 'Error creating booking');
  //     }
  //   });
  // }


  generateBookingPDF(): void {
    const element = this.pdfContent.nativeElement;

    // Temporary make it visible off-screen
    element.style.display = 'block';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.opacity = '1';

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('booking-details.pdf');
    }).catch(error => {
      console.error('Error generating canvas:', error);
    }).finally(() => {
      // Hide it again
      element.style.display = 'none';
      element.style.position = 'static';
      element.style.opacity = '0';
    });
  }





}
