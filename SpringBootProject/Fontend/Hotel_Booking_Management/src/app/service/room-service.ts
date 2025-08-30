import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Room } from '../model/room.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl: string = environments.apiUrl + '/api/room';



  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object

  ) { }




  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all rooms
  // getAllRooms(): Observable<Room[]> {
  //   return this.http.get<Room[]>(`${this.baseUrl}/all`, { headers: this.getAuthHeaders() }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // Fetch all rooms
  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => {
        console.error(err);
        return of([]);
      }));
  }
  // Get rooms by hotel ID

  getRoomsByHotelId(hotelId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/hotell/${hotelId}`)
      .pipe(catchError(this.handleError));
  }

  getRoomsByHotelIdHome(hotelId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/hotell/${hotelId}`, )
      .pipe(catchError(this.handleError));
  }


  // // Get rooms by hotel name
  // getRoomsByHotelName(hotelName: string): Observable<Room[]> {
  //   return this.http.get<Room[]>(`${this.baseUrl}/searchRoom?hotelName=${hotelName}`, { headers: this.getAuthHeaders() }).pipe(
  //     catchError(this.handleError)
  //   );
  // }


  saveRoom(room: Room, imageFile?: File): Observable<any> {
    const formData = new FormData();
    formData.append('room', new Blob([JSON.stringify({
      ...room,
      hotelDTO: { id: room.hotelDTO.id }
    })], { type: 'application/json' }));

    if (imageFile) formData.append('image', imageFile);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post(`${this.baseUrl}/save`, formData, { headers, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );

  }



  updateRoom(id: number, room: Room, imageFile?: File): Observable<any> {
    if (room.hotelDTO && room.hotelDTO.id && typeof room.hotelDTO.id === 'string') {
      room.hotelDTO.id = parseInt(room.hotelDTO.id, 10);
    }

    const formData = new FormData();
    formData.append('room', new Blob([JSON.stringify(room)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.put(`${this.baseUrl}/update/${id}`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }



  // ✅ Find room by id
  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // ✅ Update room (availability)

  




  // Delete room
  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    console.error('RoomService Error:', error);
    return throwError(() => error);
  }

}
