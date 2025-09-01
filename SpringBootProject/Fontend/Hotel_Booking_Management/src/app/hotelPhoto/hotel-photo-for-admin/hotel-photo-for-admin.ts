import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { HotelPhotoDTO } from '../../model/hotelPhoto.model';
import { HotelPhotoService } from '../../service/hotel-photo.service';
import { HotelService } from '../../service/hotel.service';

@Component({
  selector: 'app-hotel-photo-for-admin',
  standalone: false,
  templateUrl: './hotel-photo-for-admin.html',
  styleUrl: './hotel-photo-for-admin.css'
})
export class HotelPhotoForAdmin implements OnInit {


    hotels: Hotel[] = [];
    selectedHotelId!: number;
    photos: HotelPhotoDTO[] = [];
    maxVisiblePhotos: number = 4; // max photos to show in gallery card
    showModal: boolean = false;
    modalPhotos: HotelPhotoDTO[] = [];
  
    constructor(
      private hotelService: HotelService,
      private photoService: HotelPhotoService,
      private cdr: ChangeDetectorRef
    ) { }
  
    ngOnInit(): void {
      this.loadHotels();
    }
  
    loadHotels() {
      this.hotelService.getAllHotels().subscribe({
        next: (data: Hotel[]) => {
          this.hotels = data;
          this.cdr.markForCheck();
        },
        error: (err) => console.error(err)
      });
    }
  
    onHotelChange() {
      if (!this.selectedHotelId) {
        this.photos = [];
        return;
      }
  
      this.photoService.getPhotosByHotel(this.selectedHotelId).subscribe({
        next: (data: HotelPhotoDTO[]) => {
          this.photos = data;
          this.cdr.markForCheck();
        },
        error: (err) => console.error(err)
      });
    }
  
    deletePhoto(photoId: number) {
      if (!confirm('Are you sure you want to delete this photo?')) return;
  
      this.photoService.deletePhoto(photoId).subscribe({
        next: () => {
          this.photos = this.photos.filter(p => p.id !== photoId);
          alert('Photo deleted successfully');
        },
        error: (err) => console.error(err)
      });
    }
  
    // Open modal/lightbox to view all photos
    openModal() {
      this.modalPhotos = this.photos;
      this.showModal = true;
    }
  
    closeModal() {
      this.showModal = false;
    }
  
    getVisiblePhotos(): HotelPhotoDTO[] {
      return this.photos.slice(0, this.maxVisiblePhotos);
    }
  
    getExtraCount(): number {
      return this.photos.length - this.maxVisiblePhotos;
    }
  

}
