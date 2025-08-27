import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HotelPhotoDTO } from '../../model/hotelPhoto.model';
import { HotelPhotoService } from '../../service/hotel-photo.service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { Hotel } from '../../model/hotel.model';

@Component({
  selector: 'app-add-hotel-photo-component',
  standalone: false,
  templateUrl: './add-hotel-photo-component.html',
  styleUrl: './add-hotel-photo-component.css'
})
export class AddHotelPhotoComponent implements OnInit {


  hotelId!: number;
  selectedFiles: File[] = [];
  hotels: Hotel[] = [];
  photos: HotelPhotoDTO[] = [];

  constructor(
    private photoService: HotelPhotoService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHotels();
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadPhotos() {
    if (!this.hotelId || !this.selectedFiles.length) return;

    this.photoService.uploadPhotos(this.hotelId, this.selectedFiles).subscribe({
      next: (photos: HotelPhotoDTO[]) => {
        alert(`${photos.length} photo(s) uploaded successfully`);
        console.log("Uploaded:", photos);
        this.photos = photos;
        this.selectedFiles = [];
        this.router.navigate(['/viewgallery']);
      },
      error: (err) => {
        console.error("Upload error:", err);
        alert("Upload failed!");
      }
    });
  }


  // Load hotels for dropdown
  loadHotels() {
    this.hotelService.getMyHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }



}
