import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-for-hotel-admin',
  standalone: false,
  templateUrl: './view-for-hotel-admin.html',
  styleUrl: './view-for-hotel-admin.css'
})
export class ViewForHotelAdmin implements OnInit {


  hotels: Hotel[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.loading = true;
    this.hotelService.getMyHotels().subscribe({
      next: (data: Hotel[]) => { // type safe
        this.hotels = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load Hotels.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Delete method
  deleteHotels(id: number): void {
    if (confirm('Are you sure you want to delete this Hotel?')) {
      this.hotelService.deleteHotel(id).subscribe({
        next: () => {
          alert('Hotel deleted successfully');
          this.loadHotels(); // refresh list
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete Hotel.');
        }
      });
    }
  }

  // Edit method
  editHotel(id: number): void {
    this.router.navigate(['/editHotel', id]);
  }

}
