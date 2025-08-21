import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { HotelAmenities } from '../../model/hotelAmenities.model';
import { HotelService } from '../../service/hotel.service';
import { HotelAmenitiesService } from '../../service/hotel-amenities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-amenities-component',
  standalone: false,
  templateUrl: './add-amenities-component.html',
  styleUrl: './add-amenities-component.css'
})
export class AddAmenitiesComponent implements OnInit {

  hotels: Hotel[] = [];
  amenitiesList: HotelAmenities[] = [];
  amenities: HotelAmenities = {} as HotelAmenities;
  isEditMode: boolean = false;

  // List of all amenities for dynamic iteration in template
  amenitiesOptions = [
    { key: 'freeWifi', label: 'Free Wifi' },
    { key: 'freeParking', label: 'Free Parking' },
    { key: 'swimmingPool', label: 'Swimming Pool' },
    { key: 'gym', label: 'Gym' },
    { key: 'restaurant', label: 'Restaurant' },
    { key: 'roomService', label: 'Room Service' },
    { key: 'airConditioning', label: 'Air Conditioning' },
    { key: 'laundryService', label: 'Laundry Service' },
    { key: 'wheelchairAccessible', label: 'Wheelchair Accessible' },
    { key: 'healthServices', label: 'Health Services' },
    { key: 'playGround', label: 'Play Ground' },
    { key: 'airportSuttle', label: 'Airport Shuttle' },
    { key: 'breakFast', label: 'Break Fast' }
  ];

  constructor(
    private hotelService: HotelService,
    private amenitiesService: HotelAmenitiesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHotels();
    this.loadAllAmenities();
  }

  // 🔹 Load hotels for HotelAdmin dropdown
  loadHotels(): void {
    this.hotelService.getMyHotels().subscribe(
      data => this.hotels = data,
      err => console.error(err)
    );
  }

  // 🔹 Load all amenities
  loadAllAmenities(): void {
    this.amenitiesService.getAllAmenities().subscribe(
      data => this.amenitiesList = data,
      err => console.error(err)
    );
  }

  // 🔹 Add or Update amenities
  saveAmenities(): void {
    if (!this.amenities.hotelId) {
      alert('Please select a hotel!');
      return;
    }

    if (this.isEditMode) {
      this.amenitiesService.updateAmenities(this.amenities.id, this.amenities).subscribe(
        res => {
          alert('Amenities updated successfully!');
          this.resetForm();
          this.loadAllAmenities();
        },
        err => console.error(err)
      );
    } else {
      this.amenitiesService.addAmenities(this.amenities).subscribe(
        res => {
          alert('Amenities added successfully!');
          this.resetForm();
          this.loadAllAmenities();
          this.router.navigate(['/viewamenities']);
        },
        err => console.error(err)
      );
    }
  }

  // 🔹 Edit selected amenities
  editAmenities(item: HotelAmenities): void {
    this.amenities = { ...item };
    this.isEditMode = true;
  }

  // 🔹 Delete amenities
  deleteAmenities(id: number): void {
    if (confirm('Are you sure you want to delete this amenities?')) {
      this.amenitiesService.deleteAmenities(id).subscribe(
        () => {
          alert('Amenities deleted successfully!');
          this.loadAllAmenities();
        },
        err => console.error(err)
      );
    }
  }

  // 🔹 Reset form to initial state
  resetForm(): void {
    this.amenities = {} as HotelAmenities;
    this.isEditMode = false;
  }

}
