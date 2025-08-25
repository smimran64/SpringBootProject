import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddlocationComponent } from './location/addlocation-component/addlocation-component';
import { Viewalllocation } from './location/viewalllocation/viewalllocation';
import { EditLocationComponent } from './location/edit-location-component/edit-location-component';
import { CustomerRegComponent } from './customer/customer-reg-component/customer-reg-component';
import { Login } from './auth/login/login';
import { HotelAdminRegComponent } from './hotelAdmin/hotel-admin-reg-component/hotel-admin-reg-component';
import { AddhotelComponent } from './hotel/addhotel-component/addhotel-component';
import { Viewallhotelcomponent } from './hotel/viewallhotelcomponent/viewallhotelcomponent';
import { AddRoomComponent } from './Room/add-room-component/add-room-component';
import { ViewRoomComponent } from './Room/view-room-component/view-room-component';
import { AdminRegComponent } from './Admin/admin-reg-component/admin-reg-component';
import { AdminProfileComponent } from './Admin/admin-profile-component/admin-profile-component';
import { HotelAdminProfile } from './hotelAdmin/hotel-admin-profile/hotel-admin-profile';
import { CustomerProfileComponent } from './customer/customer-profile-component/customer-profile-component';
import { HomeComponenent } from './home/home-componenent/home-componenent';
import { HotelDetailsCompononent } from './hotel/hotel-details-compononent/hotel-details-compononent';
import { AboutHotel } from './layout/about-hotel/about-hotel';
import { Logout } from './auth/logout/logout';
import { AddAmenitiesComponent } from './HotelAmenities/add-amenities-component/add-amenities-component';
import { ViewAmenitiesComponent } from './HotelAmenities/view-amenities-component/view-amenities-component';
import { HotelInfoComponent } from './hotelInfo/hotel-info-component/hotel-info-component';
import { ViewHotelInfoComponent } from './hotelInfo/view-hotel-info-component/view-hotel-info-component';
import { AddBookingComponent } from './booking/add-booking-component/add-booking-component';

const routes: Routes = [
  {path: 'addlocation', component: AddlocationComponent},
  {path: 'viewlocation', component: Viewalllocation},
  {path: 'editlocation/:id', component: EditLocationComponent},
  {path: 'addhotel', component: AddhotelComponent},
  {path: 'viewHotel', component: Viewallhotelcomponent},
  {path: 'addroom', component: AddRoomComponent},
  {path: 'allroom', component: ViewRoomComponent},
  {path: 'customerReg', component: CustomerRegComponent},
  {path: 'hotelAdminReg', component: HotelAdminRegComponent},
  {path: 'adminReg', component: AdminRegComponent},
  {path: 'adminProfile', component: AdminProfileComponent},
  {path: 'hoteladminProfile', component: HotelAdminProfile},
  {path: 'customerProfile', component: CustomerProfileComponent},
  // {path: 'home', component: HomeComponenent},
  {path: 'hotel-details/:id', component: HotelDetailsCompononent},
  {path: '', component: AboutHotel},
  {path: 'login', component: Login},
  {path: 'logout', component: Logout},
  {path: 'addamenities', component: AddAmenitiesComponent},
  {path: 'viewamenities', component: ViewAmenitiesComponent},
  {path: 'addhotelinfo', component: HotelInfoComponent},
  {path: 'viewhotelinfo', component: ViewHotelInfoComponent},
  {path: 'addbooking/:id', component: AddBookingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
