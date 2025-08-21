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

  private baseUrl = environments.apiUrl + '/api/hoteladmin/reg';


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

    return this.http.post(this.baseUrl, formData);
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

    return this.http.get<HotelAdmin>(`${environments.apiUrl}/api/hotelAdmin/profile`, { headers });
  }


   getHotelByAdminId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

}
