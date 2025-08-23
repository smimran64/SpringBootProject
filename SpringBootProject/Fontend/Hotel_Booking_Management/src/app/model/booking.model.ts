export interface Booking {
    id?: number;
    contractPersonName: string;
    phone: string;
    checkIn: Date | string;
    checkOut: Date | string;
    advanceAmount: number;
    dueAmount?: number;
    totalAmount?: number;
    numberOfRooms: number;

    customerdto?: {
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
    };

    hoteldto?: {
        id: number;
        name: string;
        location: string;
    };

    roomdto?: {
        id: number;
        roomType: string;
        bookedRooms: number;
        adults: number;
        children: number;
        price: number;
    };
}
