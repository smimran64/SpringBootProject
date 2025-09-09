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
    this.loadNotifications();

    // Optional: Auto refresh every 5 seconds
    setInterval(() => {
      this.loadNotifications();
    }, 5000);
  }

  loadNotifications() {
    const data = this.localStorageService.getItem('bookingNotifications') || [];
    this.notifications = data;
  }

  clearNotifications() {
    this.localStorageService.removeItem('bookingNotifications');
    this.notifications = [];
  }
}
