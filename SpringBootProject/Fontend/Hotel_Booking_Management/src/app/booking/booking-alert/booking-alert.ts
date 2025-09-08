import { Component } from '@angular/core';
import { LocaStorageService } from '../../service/loca-storage.service';

@Component({
  selector: 'app-booking-alert',
  standalone: false,
  templateUrl: './booking-alert.html',
  styleUrl: './booking-alert.css'
})
export class BookingAlert {

  notifications: any[] = [];

  constructor(private localStorageService: LocaStorageService) { }

  ngOnInit(): void {
    this.notifications = this.localStorageService.getItem('bookingNotifications') || [];
  }

  clearNotifications() {
    this.localStorageService.removeItem('bookingNotifications'); // service ব্যবহার করলাম
    this.notifications = [];
  }
}
