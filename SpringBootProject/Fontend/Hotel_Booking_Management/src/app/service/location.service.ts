import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Location } from '../model/location.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = environments.apiUrl + '/api/location';

  constructor(
    private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  //creat location

  createLocation(location: Location, image: File) {
    const formData = new FormData();
    formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));
    formData.append('image', image);

    return this.http.post(this.baseUrl + '/save', formData, {
      responseType: 'text' as 'json'
    });
  }

  // Update location with image
  updateLocation(id: number, location: Location, image?: File) {
    const formData = new FormData();
    formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));

    // Append image only if provided (optional)
    if (image) {
      formData.append('image', image);
    }

    return this.http.put(this.baseUrl + `/update/${id}`, formData, {
      responseType: 'text' as 'json'
    });
  }

  // Delete location by id
  deleteLocation(id: number) {
    return this.http.delete(this.baseUrl + `/delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }




   getAllLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/all');
  }

}
