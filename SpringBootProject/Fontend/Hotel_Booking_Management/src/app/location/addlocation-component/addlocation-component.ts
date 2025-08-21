import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../service/location.service';

import { Location } from '../../model/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlocation-component',
  standalone: false,
  templateUrl: './addlocation-component.html',
  styleUrl: './addlocation-component.css'
})
export class AddlocationComponent implements OnInit {


  formGroup!: FormGroup;
  imageFile: File | null = null;

  constructor(
    private locationService: LocationService,
    private fb: FormBuilder,
    private router: Router

  ) { }
  ngOnInit(): void {

    this.formGroup = this.fb.group({
      name: ['', Validators.required]
    });


  }

  // onFileSelected(evt: Event): void {
  //   const input = evt.target as HTMLInputElement;
  //   if (input?.files && input.files[0]) {

  //     this.image = input.files[0];
  //   }

  // }


onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      console.log('Selected file:', this.imageFile);
    }
  }




  onSubmit() {
    if (this.formGroup.invalid) {
      alert("Please fill all required fields");
    }

    if (this.imageFile) {

      const location: Location = {
        ...this.formGroup.value

      };

      this.locationService.createLocation(location, this.imageFile).subscribe({

        next: res => {
          console.log('location added successfully', location);
          this.router.navigate(['/viewlocation']);
        },

        error: err => {

          console.error('Error adding location', err);
        }

      });
    }
    else {
      alert("Please select an image file");
    }

  }

}
