import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Authservice } from '../service/authservice';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'  
})

export class CustomerGuard implements CanActivate {


  
  constructor(

    private authService: Authservice,
    private router: Router,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


   canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {

    console.log('Role from AuthService:', this.authService.getUserRole());

    if(this.authService.isCustomer()){
      
      return true;
    }

    return this.router.createUrlTree(['login']);
 
  }
  
};
