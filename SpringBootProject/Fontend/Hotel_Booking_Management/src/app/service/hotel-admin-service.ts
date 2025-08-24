import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authservice } from './authservice';
import { Observable } from 'rxjs';
import { HotelAdmin } from '../model/hotelAdmin.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HotelAdminService {

  private baseUrl = environments.apiUrl + '/api/hoteladmin';


  constructor(
    private http: HttpClient,
    private authService: Authservice,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  registerHotelAdmin(user: any, hotelAdmin: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('hotelAdmin', JSON.stringify(hotelAdmin));
    formData.append('image', image);

    return this.http.post(`${this.baseUrl}/reg`, formData);
  }


  getProfile(): Observable<HotelAdmin> {

    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get<HotelAdmin>(`${this.baseUrl}/profile`, { headers });
  }


  // Get Hotel Info by Hotel ID
  getHotelInfoByHotelId(hotelId: number): Observable<any> {

     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get(`${this.baseUrl}/hotelInfo/${hotelId}`);
  }

  // Get Hotel Amenities by Hotel ID
  getHotelAmenitiesByHotelId(hotelId: number): Observable<any> {


     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get(`${this.baseUrl}/amenities/${hotelId}`);
  }

  // Optionally: Get all hotels for this admin (already partially exists)
  getHotelsByAdminId(adminId: number): Observable<any[]> {

     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }
    
    return this.http.get<any[]>(`${this.baseUrl}/myHotels/${adminId}`);
  }


}
