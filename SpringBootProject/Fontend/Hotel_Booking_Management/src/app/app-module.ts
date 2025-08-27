import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AddlocationComponent } from './location/addlocation-component/addlocation-component';
import { Viewalllocation } from './location/viewalllocation/viewalllocation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { EditLocationComponent } from './location/edit-location-component/edit-location-component';
import { AddhotelComponent } from './hotel/addhotel-component/addhotel-component';
import { Viewallhotelcomponent } from './hotel/viewallhotelcomponent/viewallhotelcomponent';
import { CustomerRegComponent } from './customer/customer-reg-component/customer-reg-component';
import { Viewcustomercomponent } from './customer/viewcustomercomponent/viewcustomercomponent';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { AboutHotel } from './layout/about-hotel/about-hotel';
import { Login } from './auth/login/login';
import { Logout } from './auth/logout/logout';
import { HotelAdminRegComponent } from './hotelAdmin/hotel-admin-reg-component/hotel-admin-reg-component';
import { ViewAllHotelAdmin } from './hotelAdmin/view-all-hotel-admin/view-all-hotel-admin';
import { AddRoomComponent } from './Room/add-room-component/add-room-component';
import { ViewRoomComponent } from './Room/view-room-component/view-room-component';
import { AdminRegComponent } from './Admin/admin-reg-component/admin-reg-component';
import { AdminProfileComponent } from './Admin/admin-profile-component/admin-profile-component';
import { HotelAdminProfile } from './hotelAdmin/hotel-admin-profile/hotel-admin-profile';
import { CustomerProfileComponent } from './customer/customer-profile-component/customer-profile-component';
import { HomeComponenent } from './home/home-componenent/home-componenent';
import { HotelDetailsCompononent } from './hotel/hotel-details-compononent/hotel-details-compononent';
import { AddAmenitiesComponent } from './HotelAmenities/add-amenities-component/add-amenities-component';
import { ViewAmenitiesComponent } from './HotelAmenities/view-amenities-component/view-amenities-component';
import { HotelInfoComponent } from './hotelInfo/hotel-info-component/hotel-info-component';
import { ViewHotelInfoComponent } from './hotelInfo/view-hotel-info-component/view-hotel-info-component';
import { AddBookingComponent } from './booking/add-booking-component/add-booking-component';
import { ViewBookingComponent } from './booking/view-booking-component/view-booking-component';
import { AddHotelPhotoComponent } from './hotelPhoto/add-hotel-photo-component/add-hotel-photo-component';
import { ViewHotelPhotoComponent } from './hotelPhoto/view-hotel-photo-component/view-hotel-photo-component';

@NgModule({
  declarations: [
    App,
    AddlocationComponent,
    Viewalllocation,
    EditLocationComponent,
    AddhotelComponent,
    Viewallhotelcomponent,
    CustomerRegComponent,
    Viewcustomercomponent,
    Navbar,
    Footer,
    AboutHotel,
    Login,
    Logout,
    HotelAdminRegComponent,
    ViewAllHotelAdmin,
    AddRoomComponent,
    ViewRoomComponent,
    AdminRegComponent,
    AdminProfileComponent,
    HotelAdminProfile,
    CustomerProfileComponent,
    HomeComponenent,
    HotelDetailsCompononent,
    AddAmenitiesComponent,
    ViewAmenitiesComponent,
    HotelInfoComponent,
    ViewHotelInfoComponent,
    AddBookingComponent,
    ViewBookingComponent,
    AddHotelPhotoComponent,
    ViewHotelPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
