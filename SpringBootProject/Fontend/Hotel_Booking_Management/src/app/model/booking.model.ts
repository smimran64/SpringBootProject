import { Customer } from "./customer.model";
import { Hotel } from "./hotel.model";
import { Room } from "./room.model";

export interface Booking {
  id?: number;
  contractPersonName: string;
  phone: string;
  checkIn: Date | string;
  checkOut: Date | string;
  numberOfRooms: number;
  discountRate?: number;
  totalAmount?: number;
  advanceAmount?: number;
  dueAmount?: number;
  
  
  customerId: number;
  hotelId: number;
  roomId: number;

  
  customer?: Customer;
  hotel?: Hotel;
  room?: Room;
}
