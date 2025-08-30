import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environments.apiUrl + '/api/user/all';

  constructor(
    private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object

  ) {}


  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(`${this.baseUrl}`);
  }
  
}
