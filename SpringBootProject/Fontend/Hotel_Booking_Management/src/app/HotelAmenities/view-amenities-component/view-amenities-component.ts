import { Component, OnInit } from '@angular/core';
import { HotelAmenities } from '../../model/hotelAmenities.model';
import { HotelAmenitiesService } from '../../service/hotel-amenities.service';

@Component({
  selector: 'app-view-amenities-component',
  standalone: false,
  templateUrl: './view-amenities-component.html',
  styleUrl: './view-amenities-component.css'
})
export class ViewAmenitiesComponent implements OnInit {

  amenitiesList: HotelAmenities[] = [];

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

  constructor(private amenitiesService: HotelAmenitiesService) { }

  ngOnInit(): void {
    this.loadAllAmenities();
  }

  loadAllAmenities(): void {
    this.amenitiesService.getAllAmenities().subscribe(
      data => this.amenitiesList = data,
      err => console.error(err)
    );
  }

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

  editAmenities(item: HotelAmenities): void {
    // Redirect to Add/Edit Amenities page with id or open modal
    // For simplicity, we redirect to AddAmenitiesComponent
    window.location.href = `/add-amenities/${item.id}`;
  }
}
