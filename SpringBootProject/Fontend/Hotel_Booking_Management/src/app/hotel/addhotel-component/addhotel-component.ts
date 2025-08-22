import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../../model/hotel.model';
import { HotelService } from '../../service/hotel.service';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addhotel-component',
  standalone: false,
  templateUrl: './addhotel-component.html',
  styleUrl: './addhotel-component.css'
})
export class AddhotelComponent implements OnInit {


  hotelForm!: FormGroup;
  locations: any[] = [];
  selectedImage!: File;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private locationService: LocationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      rating: ['', Validators.required],
      locationId: ['', Validators.required]
    });

    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next: (res) => {
        this.locations = res;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading locations', err)
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  saveHotel(): void {
    if (this.hotelForm.invalid || !this.selectedImage) {
      this.message = 'Please fill all fields and select an image';
      return;
    }

    const hotel: Hotel = {
      name: this.hotelForm.value.name,
      address: this.hotelForm.value.address,
      rating: this.hotelForm.value.rating,
      location: { id: this.hotelForm.value.locationId }
    };

    this.hotelService.saveHotel(hotel, this.selectedImage).subscribe({
      next: () => {
        alert('Hotel added successfully');
        this.router.navigate(['/viewHotel']);
      },
      error: (err) => {        
        this.message = 'Error saving hotel';
      }
    });
  }


}
