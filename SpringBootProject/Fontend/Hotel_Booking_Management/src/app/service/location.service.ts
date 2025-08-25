import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../model/location.model';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = environments.apiUrl + '/api/location';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Helper method to get JWT headers

  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return ''; // SSR বা Node context এ empty token
  }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Create location

  createLocation(location: Location, image: File) {

    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    const formData = new FormData();
    formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));
    formData.append('image', image);

    return this.http.post(this.baseUrl + '/save', formData, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
    });
  }

  // Update location with image

  updateLocation(id: number, location: Location, image?: File) {


    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    const formData = new FormData();
    formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));

    if (image) {
      formData.append('image', image);
    }

    return this.http.put(this.baseUrl + `/update/${id}`, formData, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
    });
  }

  // Delete location by id

  deleteLocation(id: number) {

    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }


    return this.http.delete(this.baseUrl + `/delete/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
    });
  }

  // Get all locations

  getAllLocations(): Observable<any[]> {


    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.get<any[]>(this.baseUrl + '/all', {
      headers: this.getAuthHeaders()
    });


  }


  
  getAllLocationsForHome(): Observable<any[]> {
    
    return this.http.get<any[]>(this.baseUrl + '/all');


  }

}
