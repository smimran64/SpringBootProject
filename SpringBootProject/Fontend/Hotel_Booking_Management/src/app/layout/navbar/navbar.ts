import { Component, OnInit } from '@angular/core';
import { Authservice } from '../../service/authservice';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {


   userRole: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private authService: Authservice) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.isLoggedIn = this.authService.isLoggIn();

    
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  logout() {
    this.authService.logout();
  }

 
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  isHotelAdmin(): boolean {
    return this.authService.isHotelAdmin();
  }
  isCustomer(): boolean {
    return this.authService.isCustomer();
  }


  
}
