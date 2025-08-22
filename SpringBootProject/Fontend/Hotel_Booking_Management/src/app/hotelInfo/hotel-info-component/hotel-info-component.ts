import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HotelInfo } from '../../model/hotelInfo.model';
import { HotelInfoService } from '../../service/hotel-info.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../../model/hotel.model';
import { HotelService } from '../../service/hotel.service';

@Component({
  selector: 'app-hotel-info-component',
  standalone: false,
  templateUrl: './hotel-info-component.html',
  styleUrl: './hotel-info-component.css'
})
export class HotelInfoComponent implements OnInit {


  hotelInfoForm!: FormGroup;
  hotels: Hotel[] = [];
  hotelInfos: HotelInfo[] = [];
  selectedHotelInfo: HotelInfo | null = null;

  constructor(
    private fb: FormBuilder,
    private hotelInfoService: HotelInfoService,
    private hotelService: HotelService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadHotels();
    this.loadAllHotelInfo();
  }

  private buildForm(): void {
    this.hotelInfoForm = this.fb.group({
      hotelId: [0, Validators.required],
      ownerSpeach: ['', Validators.required],
      description: ['', Validators.required],
      hotelPolicy: ['', Validators.required]
    });
  }

  // Load allowed hotels for logged-in user
  private loadHotels(): void {
    this.hotelService.getMyHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
        this.cdr.markForCheck();
        if (this.hotels.length === 1) {
          this.hotelInfoForm.patchValue({ hotelId: this.hotels[0].id });
        }
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error loading hotels', err)
    });
  }

  // Load all hotel info
  private loadAllHotelInfo(): void {
    this.hotelInfoService.getAllHotelInfo().subscribe({
      next: (data) => this.hotelInfos = data,
      error: (err) => console.error('Error loading hotel info', err)
    });
  }

  // Save new hotel info
  saveHotelInfo(): void {
    if (this.hotelInfoForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const newInfo: HotelInfo = {
      id: 0,
      hotelId: this.hotelInfoForm.value.hotelId,
      ownerSpeach: this.hotelInfoForm.value.ownerSpeach,
      description: this.hotelInfoForm.value.description,
      hotelPolicy: this.hotelInfoForm.value.hotelPolicy,
      hotelName: this.hotels.find(h => h.id === this.hotelInfoForm.value.hotelId)?.name || ''
    };

    this.hotelInfoService.saveHotelInfo(newInfo).subscribe({
      next: (data) => {
        this.hotelInfos.push(data);
        this.hotelInfoForm.reset({ hotelId: this.hotels.length === 1 ? this.hotels[0].id : 0 });
        this.router.navigate(['/viewhotelinfo']);
      },
      error: (err) => console.error('Error saving hotel info', err)
    });
  }

  // Edit existing hotel info
  editHotelInfo(info: HotelInfo): void {
    this.selectedHotelInfo = { ...info };
    this.hotelInfoForm.patchValue({
      hotelId: info.hotelId,
      ownerSpeach: info.ownerSpeach,
      description: info.description,
      hotelPolicy: info.hotelPolicy
    });
  }

  // Update hotel info
  updateHotelInfo(): void {
    if (!this.selectedHotelInfo || this.hotelInfoForm.invalid) return;

    const updatedInfo: HotelInfo = {
      ...this.selectedHotelInfo,
      hotelId: this.hotelInfoForm.value.hotelId,
      ownerSpeach: this.hotelInfoForm.value.ownerSpeach,
      description: this.hotelInfoForm.value.description,
      hotelPolicy: this.hotelInfoForm.value.hotelPolicy,
      hotelName: this.hotels.find(h => h.id === this.hotelInfoForm.value.hotelId)?.name || ''
    };

    this.hotelInfoService.updateHotelInfo(updatedInfo.id, updatedInfo).subscribe({
      next: (data) => {
        const index = this.hotelInfos.findIndex(h => h.id === data.id);
        if (index !== -1) this.hotelInfos[index] = data;
        this.selectedHotelInfo = null;
        this.hotelInfoForm.reset({ hotelId: this.hotels.length === 1 ? this.hotels[0].id : 0 });
      },
      error: (err) => console.error('Error updating hotel info', err)
    });
  }

  // Delete hotel info
  deleteHotelInfo(id: number): void {
    if (!confirm('Are you sure to delete this hotel info?')) return;

    this.hotelInfoService.deleteHotelInfo(id).subscribe({
      next: () => {
        this.hotelInfos = this.hotelInfos.filter(h => h.id !== id);
      },
      error: (err) => console.error('Error deleting hotel info', err)
    });
  }

}
