export interface Room {
    id?: number;
    roomType: string;
    image?: string;
    totalRooms: number;
    adults: number;
    children: number;
    price: number;
    availableRooms?: number;
    bookedRooms?: number;
   hotelDTO: {
        id: number;
        name?: string;
        address?: string;
        rating?: number;
        image?: string;
    };
}
