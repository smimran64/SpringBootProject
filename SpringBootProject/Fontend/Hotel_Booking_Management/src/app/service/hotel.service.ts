import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Hotel } from '../model/hotel.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  baseUrl: string = environments.apiUrl + '/api/hotel';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return ''; 
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    console.log('TOKEN', token); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  // Get logged-in admin hotels

  getMyHotels(): Observable<Hotel[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Hotel[]>(`${this.baseUrl}/myHotels`, { headers });
  }


  // Fetch only hotels of logged-in HOTEL_ADMIN

  // getHotelsForhotelAdmin(): Observable<Hotel[]> {
  //   const headers = this.getAuthHeaders();
  //   return this.http.get<Hotel[]>(`${this.baseUrl}/forhotelAdmin`, { headers })
  //     .pipe(catchError(this.handleError));
  // }




  getAllHotels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
      catchError(this.handleError)
    );
  }



  // Save hotel with optional image

  saveHotel(hotel: Hotel, imageFile?: File): Observable<any> {
    const formData = new FormData();
    formData.append('hotel', new Blob([JSON.stringify(hotel)], { type: 'application/json' }));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const headers = this.getAuthHeaders();

    return this.http.post(`${this.baseUrl}/save`, formData, { headers })
      .pipe(catchError(err => throwError(() => err)));
  }


  // Update hotel with optional image

  updateHotel(id: number, hotel: Hotel, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('hotel', new Blob([JSON.stringify(hotel)], { type: 'application/json' }));

    if (image) {
      formData.append('image', image);
    }

    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.put(`${this.baseUrl}/update/${id}`, formData, { headers, responseType: 'text' as 'json' })
      .pipe(catchError(err => throwError(() => err)));
  }

  // Delete hotel by id

  deleteHotel(id: number): Observable<any> {
    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.delete(`${this.baseUrl}/delete/${id}`, { headers, responseType: 'text' as 'json' })
      .pipe(catchError(err => throwError(() => err)));
  }

  // Handle error

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  // Search hotels by location and date

  searchHotels(locationId: number, checkIn: string, checkOut: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search`, {
      params: {
        locationId: locationId.toString(),
        checkIn,
        checkOut
      }
    }).pipe(catchError(this.handleError));
  }

  // Get hotel details by ID

  getHotelById(hotelId: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/${hotelId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Fetch all rooms of a hotel
  getRoomsByHotel(hotelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${hotelId}/rooms`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
  
}
