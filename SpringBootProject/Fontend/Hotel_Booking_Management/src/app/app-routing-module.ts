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
import { AddHotelPhotoComponent } from './hotelPhoto/add-hotel-photo-component/add-hotel-photo-component';
import { ViewHotelPhotoComponent } from './hotelPhoto/view-hotel-photo-component/view-hotel-photo-component';
import { AllUserProfileComponent } from './allUser/all-user-profile-component/all-user-profile-component';
import { ViewRoomForAdmin } from './Room/view-room-for-admin/view-room-for-admin';
import { ForgotPasswordComponent } from './password/forgot-password-component/forgot-password-component';
import { ResetPasswordComponent } from './password/reset-password-component/reset-password-component';
import { ViewBookingComponent } from './booking/view-booking-component/view-booking-component';
import { ViewBookingForHotelAdmin } from './booking/view-booking-for-hotel-admin/view-booking-for-hotel-admin';
import { HotelPhotoForAdmin } from './hotelPhoto/hotel-photo-for-admin/hotel-photo-for-admin';
import { ViewForHotelAdmin } from './hotel/view-for-hotel-admin/view-for-hotel-admin';

const routes: Routes = [
  {path: 'addlocation', component: AddlocationComponent},
  {path: 'viewlocation', component: Viewalllocation},
  {path: 'editlocation/:id', component: EditLocationComponent},
  {path: 'addhotel', component: AddhotelComponent},
  {path: 'viewHotel', component: Viewallhotelcomponent},
  {path: 'viewHotelForHotelAdmin', component: ViewForHotelAdmin},
  {path: 'addroom', component: AddRoomComponent},
  {path: 'allroom', component: ViewRoomComponent},
  {path: 'roomForAdmin', component: ViewRoomForAdmin},
  {path: 'customerReg', component: CustomerRegComponent},
  {path: 'hotelAdminReg', component: HotelAdminRegComponent},
  {path: 'adminReg', component: AdminRegComponent},
  {path: 'admin-profile', component: AdminProfileComponent},
  {path: 'hoteladminProfile', component: HotelAdminProfile},
  {path: 'customerProfile', component: CustomerProfileComponent},
  {path: 'allUserProfile', component: AllUserProfileComponent},
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
  {path: 'photo', component: AddHotelPhotoComponent},
  {path: 'photoforadmin', component: HotelPhotoForAdmin},
  {path: 'viewgallery', component: ViewHotelPhotoComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'viewbookingsForAdmin', component: ViewBookingComponent},
  {path: 'viewbookingsForHotelAdmin', component:ViewBookingForHotelAdmin},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
