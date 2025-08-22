import { Component, OnInit } from '@angular/core';
import { Authservice } from '../../service/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout implements OnInit {

  constructor(

    private authService: Authservice,
    private router: Router


  ) { }

  ngOnInit(): void {
     
    this.logout();
  } 


  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
