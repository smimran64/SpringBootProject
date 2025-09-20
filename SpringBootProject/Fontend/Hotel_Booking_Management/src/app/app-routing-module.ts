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
import { BookingAlert } from './booking/booking-alert/booking-alert';
import { CustomerGuard } from './guards/customer-guard';
import { AdminGuard } from './guards/admin-guard';
import { HotelAdminGuard } from './guards/hotel-admin-guard';
import { AllGuard } from './guards/all-guard';
import { AdminHotelAdminGuard } from './guards/admin-hotel-admin-guard';
import { AdminAndCustomerGuard } from './guards/admin-and-customer-guard';

const routes: Routes = [
  {path: 'addlocation', component: AddlocationComponent, canActivate:[AdminGuard]},
  {path: 'viewlocation', component: Viewalllocation, canActivate:[AdminGuard]},
  {path: 'editlocation/:id', component: EditLocationComponent, canActivate:[AdminGuard]},
  {path: 'addhotel', component: AddhotelComponent, canActivate:[HotelAdminGuard]},
  {path: 'viewHotel', component: Viewallhotelcomponent, canActivate:[AdminGuard]},
  {path: 'viewHotelForHotelAdmin', component: ViewForHotelAdmin, canActivate:[HotelAdminGuard]},
  {path: 'addroom', component: AddRoomComponent, canActivate:[HotelAdminGuard]},
  {path: 'allroom', component: ViewRoomComponent, canActivate:[HotelAdminGuard]},
  {path: 'roomForAdmin', component: ViewRoomForAdmin, canActivate:[AdminGuard]},
  {path: 'customerReg', component: CustomerRegComponent},
  {path: 'hotelAdminReg', component: HotelAdminRegComponent},
  {path: 'adminReg', component: AdminRegComponent, canActivate:[AdminGuard]},
  {path: 'admin-profile/:id', component: AdminProfileComponent},
  {path: 'hoteladminProfile/:id', component: HotelAdminProfile, canActivate:[AdminHotelAdminGuard]},
  {path: 'customerProfile/:id', component: CustomerProfileComponent, canActivate: [AdminAndCustomerGuard]},
  {path: 'allUserProfile', component: AllUserProfileComponent, canActivate:[AdminGuard]},
  // {path: 'home', component: HomeComponenent},
  {path: 'hotel-details/:id', component: HotelDetailsCompononent},
  {path: '', component: AboutHotel},
  {path: 'login', component: Login},
  {path: 'logout', component: Logout},
  {path: 'addamenities', component: AddAmenitiesComponent, canActivate:[HotelAdminGuard]},
  {path: 'viewamenities', component: ViewAmenitiesComponent, canActivate:[AdminHotelAdminGuard]},
  {path: 'addhotelinfo', component: HotelInfoComponent, canActivate:[HotelAdminGuard]},
  {path: 'viewhotelinfo', component: ViewHotelInfoComponent, canActivate:[AdminHotelAdminGuard]},
  {path: 'addbooking/:id', component: AddBookingComponent,canActivate:[AllGuard]},
  {path: 'photo', component: AddHotelPhotoComponent, canActivate:[HotelAdminGuard]},
  {path: 'photoforadmin', component: HotelPhotoForAdmin, canActivate:[AdminGuard]},
  {path: 'viewgallery', component: ViewHotelPhotoComponent, canActivate:[HotelAdminGuard]},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'viewbookingsForAdmin', component: ViewBookingComponent, canActivate:[AdminGuard]},
  {path: 'viewbookingsForHotelAdmin', component:ViewBookingForHotelAdmin, canActivate:[HotelAdminGuard]},
  {path: 'bookingalert', component:BookingAlert, canActivate:[AllGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
