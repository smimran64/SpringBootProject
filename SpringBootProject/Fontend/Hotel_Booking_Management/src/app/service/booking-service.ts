import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../model/booking.model';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BookingService {


  private baseUrl = environments.apiUrl + '/api/booking';

  constructor(


    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object


  ) { }

  // JWT token header generator
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Create new booking

  createBooking(booking: Booking): Observable<Booking> {

    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.post<Booking>(`${this.baseUrl}/save`, booking, { headers: this.getHeaders() });
  }

  // Get all bookings

  getBookings(): Observable<Booking[]> {

    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }


    return this.http.get<Booking[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  // Get bookings by customer id

  getBookingsByCustomerId(customerId: number): Observable<Booking[]> {

    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.get<Booking[]>(`${this.baseUrl}/customer/${customerId}`, { headers: this.getHeaders() });
  }

  // Get bookings by hotel id

  getBookingsByHotelId(hotelId: number): Observable<Booking[]> {

    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.get<Booking[]>(`${this.baseUrl}/hotel/${hotelId}`, { headers: this.getHeaders() });
  }

  // Get bookings by room id

  getBookingsByRoomId(roomId: number): Observable<Booking[]> {

    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }


    return this.http.get<Booking[]>(`${this.baseUrl}/room/${roomId}`, { headers: this.getHeaders() });
  }

  // Delete booking

  deleteBooking(bookingId: number): Observable<void> {

    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.delete<void>(`${this.baseUrl}/${bookingId}`, { headers: this.getHeaders() });
  }

}
