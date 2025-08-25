import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HotelInfo } from '../model/hotelInfo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelInfoService {


  private baseUrl = environments.apiUrl + '/api/hotel/information';

  constructor(
    private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  
  
  ) {}

            // Get JWT Token from localStorage


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');  
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

                //Create

  saveHotelInfo(hotelInfo: HotelInfo): Observable<HotelInfo> {
    return this.http.post<HotelInfo>(`${this.baseUrl}/save`, hotelInfo, {
      headers: this.getAuthHeaders()
    });
  }

                //Get by Id

  getHotelInfoById(id: number): Observable<HotelInfo> {
    return this.http.get<HotelInfo>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

                    //Get All

  getAllHotelInfo(): Observable<HotelInfo[]> {
    return this.http.get<HotelInfo[]>(`${this.baseUrl}/all`, {
      headers: this.getAuthHeaders()
    });
  }

                      //Update

  updateHotelInfo(id: number, hotelInfo: HotelInfo): Observable<HotelInfo> {
    return this.http.put<HotelInfo>(`${this.baseUrl}/edit/${id}`, hotelInfo, {
      headers: this.getAuthHeaders()
    });
  }

                      //Delete

  deleteHotelInfo(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'  
    });
  }

                  // Find by HotelId

  getHotelInfoByHotelId(hotelId: number): Observable<HotelInfo> {
    return this.http.get<HotelInfo>(`${this.baseUrl}/hotel/${hotelId}`, {
      headers: this.getAuthHeaders()
    });
  }

  //for public

  
  getHotelInfoByHotelIdpublic(hotelId: number): Observable<HotelInfo> {
    return this.http.get<HotelInfo>(`${this.baseUrl}/hotel/${hotelId}`);
  }
  
}
