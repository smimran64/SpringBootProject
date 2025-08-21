

export interface HotelAmenities {
  id: number;
  freeWifi: boolean;
  freeParking: boolean;
  swimmingPool: boolean;
  gym: boolean;
  restaurant: boolean;
  roomService: boolean;
  airConditioning: boolean;
  laundryService: boolean;
  wheelchairAccessible: boolean;
  healthServices: boolean;
  playGround: boolean;
  airportSuttle: boolean;
  breakFast: boolean;
  hotelId: number;
  hotelName?: string; 

  [key: string]: any;  // <-- Add this line
}
