import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { Location } from '../../model/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewalllocation',
  standalone: false,
  templateUrl: './viewalllocation.html',
  styleUrl: './viewalllocation.css'
})
export class Viewalllocation implements OnInit {

  locations: Location[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  
  
  ) { }

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.loading = true;
    this.locationService.getAllLocations().subscribe({
      next: (data: any) => {
        this.locations = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load locations.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Delete method
  deleteLocation(id: number): void {
    if (confirm('Are you sure you want to delete this location?')) {
      this.locationService.deleteLocation(id).subscribe({
        next: () => {         
          this.loadLocations(); // refresh list
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete location.');
        }
      });
    }
  }


  // Edit method
  editLocation(id: number): void {
    this.router.navigate(['/editlocation', id]); 
  }



}
