import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelPhotoDTO } from '../model/hotelPhoto.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HotelPhotoService {


  private baseUrl = `${environments.apiUrl}/api/hotelPhoto`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Upload multiple photos


uploadPhotos(hotelId: number, files: File[]): Observable<HotelPhotoDTO[]> {
  let headers = new HttpHeaders();
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('authToken');
    if (token) headers = headers.set('Authorization', 'Bearer ' + token);
  }

  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  return this.http.post<HotelPhotoDTO[]>(`${this.baseUrl}/upload/${hotelId}`, formData, { headers });
}

getPhotosByHotel(hotelId: number): Observable<HotelPhotoDTO[]> {
  let headers = new HttpHeaders();
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('authToken');
    if (token) headers = headers.set('Authorization', 'Bearer ' + token);
  }

  return this.http.get<HotelPhotoDTO[]>(`${this.baseUrl}/hotel/${hotelId}`, { headers });
}

// for public

getPhotosByHotelPublic(hotelId: number): Observable<HotelPhotoDTO[]> {
  
  return this.http.get<HotelPhotoDTO[]>(`${this.baseUrl}/hotel/${hotelId}`);
}

  // 🔹 Delete photo by ID
  deletePhoto(photoId: number): Observable<any> {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.delete<any>(`${this.baseUrl}/${photoId}`, { headers });
    // 👆 delete ও JSON বা text দিতে পারে, তাই Observable<any>
  }




}
