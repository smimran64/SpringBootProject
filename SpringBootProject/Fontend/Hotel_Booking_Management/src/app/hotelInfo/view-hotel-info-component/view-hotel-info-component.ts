import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HotelInfo } from '../../model/hotelInfo.model';
import { HotelInfoService } from '../../service/hotel-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-hotel-info-component',
  standalone: false,
  templateUrl: './view-hotel-info-component.html',
  styleUrl: './view-hotel-info-component.css'
})
export class ViewHotelInfoComponent implements OnInit {

  hotelInfos: HotelInfo[] = [];
  loading = false;
  message = '';

  constructor(
    private hotelInfoService: HotelInfoService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHotelInfos();
  }

  private loadHotelInfos(): void {
    this.loading = true;

    this.hotelInfoService.getAllHotelInfo().subscribe({
      next: (data: HotelInfo[]) => {
        this.hotelInfos = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading hotel info', err);
        this.message = 'Failed to load hotel information';
        this.loading = false;
      }
    });
  }

  deleteHotelInfo(id: number): void {
    if (!confirm('Are you sure you want to delete this hotel info?')) return;

    this.hotelInfoService.deleteHotelInfo(id).subscribe({
      next: (data) => {
        this.hotelInfos = this.hotelInfos.filter(h => h.id !== id);
      },
      error: (err) => {
        console.error('Error deleting hotel info', err);
        this.message = 'Failed to delete hotel info';
      }
    });
  }
 


}
