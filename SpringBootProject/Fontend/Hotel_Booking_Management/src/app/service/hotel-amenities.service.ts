import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HotelAmenities } from '../model/hotelAmenities.model';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HotelAmenitiesService {


  private baseUrl = environments.apiUrl+'/api/amenities';

  constructor(
    private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  
  
  ) { }

  // Helper method: create headers with JWT token

  // private getAuthHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('authToken'); 
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  // }

                    //  Add new amenities

  addAmenities(dto: HotelAmenities): Observable<HotelAmenities> {
     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }
    return this.http.post<HotelAmenities>(`${this.baseUrl}/save`, dto, { headers });
  }

                   //   Get all amenities

  getAllAmenities(): Observable<HotelAmenities[]> {

     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get<HotelAmenities[]>(`${this.baseUrl}/all`, { headers});
  }

                      //  Get amenities by id

  getAmenitiesById(id: number): Observable<HotelAmenities> {

     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get<HotelAmenities>(`${this.baseUrl}/${id}`, { headers});
  }

                   // Get amenities by hotelId

  getAmenitiesByHotelId(hotelId: number): Observable<HotelAmenities> {

     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get<HotelAmenities>(`${this.baseUrl}/hotel/${hotelId}`, { headers});
  }

  // for public

  getAmenitiesByHotelIdpublic(hotelId: number): Observable<HotelAmenities> {    

    return this.http.get<HotelAmenities>(`${this.baseUrl}/hotel/${hotelId}`);
  }
  

                         // Update amenities


  updateAmenities(id: number, dto: HotelAmenities): Observable<HotelAmenities> {

     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.put<HotelAmenities>(`${this.baseUrl}/edit/${id}`, dto, { headers});
  }

                // Delete amenities

  deleteAmenities(id: number): Observable<void> {
     let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers});
  }

  
  
}
