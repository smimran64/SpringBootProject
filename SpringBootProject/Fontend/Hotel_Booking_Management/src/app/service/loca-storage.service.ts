import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaStorageService {



  constructor() { }

  // to set data
  setItem(key: string, value: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // to get data
  getItem(key: string): any {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  // to remove fixed data
  removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  // To remove all
  clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }

}
