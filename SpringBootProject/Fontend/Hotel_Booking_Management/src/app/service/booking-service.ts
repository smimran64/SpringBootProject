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

  createBooking(booking: Booking): Observable<Booking> {

    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }


    return this.http.post<Booking>(`${this.baseUrl}/save`, booking, { headers });
  }


  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }


  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }


  getBookingsByCustomerId(customerId: number): Observable<Booking[]> {

    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get<Booking[]>(`${this.baseUrl}/customer/${customerId}`, { headers });
  }


  getBookingsByHotelId(hotelId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/hotel/${hotelId}`);
  }


  getBookingsByRoomId(roomId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/room/${roomId}`);
  }


  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
