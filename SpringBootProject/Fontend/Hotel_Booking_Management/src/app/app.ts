import { Component, OnInit } from '@angular/core';
import { User } from './model/user.model';
import { Authservice } from './service/authservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'Hotel_Booking_Management';


  userRole: string | null = '';
  currentUser: User | null = null;

  constructor(
    private authService: Authservice

  ) { }
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.userRole = user?.role || null;
    });
  }

}
