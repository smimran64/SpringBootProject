import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authservice } from './authservice';
import { Observable } from 'rxjs';
import { Admin } from '../model/Admin.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private baseUrl = environments.apiUrl + '/api/admin';


  constructor(
    private http: HttpClient,
    private authService: Authservice,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  registerAdmin(user: any, admin: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('admin', JSON.stringify(admin));
    formData.append('image', image);

    return this.http.post(`${this.baseUrl}/reg`, formData);
  }


  getLoggedInAdminProfile(): Observable<Admin> {
    const token = localStorage.getItem('authToken')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Admin>(`${this.baseUrl}/profile`, { headers });
  }


  // Specific admin profile by id
  getAdminProfile(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/profile/${adminId}`);
  }



  //  getHotelByAdminId(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/${id}`);
  // }

  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/${id}`);
  }

}
