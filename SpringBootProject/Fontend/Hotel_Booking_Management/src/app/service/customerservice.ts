import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authservice } from './authservice';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Customerservice {

  private baseUrl = environments.apiUrl + '/api/customer/';



  constructor(
    private http: HttpClient,
     private authService: Authservice,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }




  registerCustomer(user: any, customer: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('customer', JSON.stringify(customer));
    formData.append('image', image);

    return this.http.post(this.baseUrl, formData);
  }

  getProfile(): Observable<Customer> {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get<Customer>(`${environments.apiUrl}/api/customer/profile`, { headers });
  }
  
}
