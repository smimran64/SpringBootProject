import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Authservice } from '../service/authservice';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'  
})

export class AdminHotelAdminGuard implements CanActivate {

  constructor(

    private authService: Authservice,
    private router: Router,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {}



 canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
   
    if((this.authService.isAdmin() || this.authService.isHotelAdmin())){
      return true;
    }

    return this.router.createUrlTree(['login']);
 
  }
 
};
