package com.example.HotelBookingManagementSystem.service;


import com.example.HotelBookingManagementSystem.dto.BookingDTO;
import com.example.HotelBookingManagementSystem.dto.CustomerDTO;
import com.example.HotelBookingManagementSystem.dto.HotelDTO;
import com.example.HotelBookingManagementSystem.dto.RoomDTO;
import com.example.HotelBookingManagementSystem.entity.Booking;
import com.example.HotelBookingManagementSystem.entity.Customer;
import com.example.HotelBookingManagementSystem.entity.Hotel;
import com.example.HotelBookingManagementSystem.entity.Room;
import com.example.HotelBookingManagementSystem.repository.BookingRepository;
import com.example.HotelBookingManagementSystem.repository.CustomerRepository;
import com.example.HotelBookingManagementSystem.repository.HotelRepository;
import com.example.HotelBookingManagementSystem.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final CustomerRepository customerRepository;

    private final HotelRepository hotelRepository;

    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository, CustomerRepository customerRepository, HotelRepository hotelRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.customerRepository = customerRepository;
        this.hotelRepository = hotelRepository;
    }

    //    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository) {
//        this.bookingRepository = bookingRepository;
//        this.roomRepository = roomRepository;
//    }


//    public BookingDTO createBooking(BookingDTO bookingDTO) {
//        Room room = roomRepository.findById(bookingDTO.getRoomdto().getId())
//                .orElseThrow(() -> new RuntimeException("Room not found"));
//
//        // Check available rooms
//
//        if (room.getAvailableRooms() < bookingDTO.getNumberOfRooms()) {
//            throw new RuntimeException("Not enough available rooms");
//        }
//
//        // Date difference (days between check-in and check-out)
//
//        Date checkIn = bookingDTO.getCheckIn();
//        Date checkOut = bookingDTO.getCheckOut();
//        long diffInMillies = checkOut.getTime() - checkIn.getTime();
//        long days = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
//
//        if (days <= 0) {
//            throw new RuntimeException("Check-out date must be after check-in date");
//        }
//
//        // Total price calculation
//
//        double totalPrice = room.getPrice() * bookingDTO.getNumberOfRooms() * days;
//
//
//
//        // Create Booking entity
//
//        Booking booking = new Booking();
//        booking.setContractPersonName(bookingDTO.getContractPersonName());
//        booking.setPhone(bookingDTO.getPhone());
//        booking.setCheckIn(bookingDTO.getCheckIn());
//        booking.setCheckOut(bookingDTO.getCheckOut());
//        booking.setAdvanceAmount(bookingDTO.getAdvanceAmount());
//        booking.setTotalAmount(totalPrice);
//        booking.setDueAmount(totalPrice - bookingDTO.getAdvanceAmount());
//        booking.setNumberOfRooms(bookingDTO.getNumberOfRooms());
//        booking.setHotel(room.getHotel());
//        booking.setRoom(room);
//
//
//
//
//
//
//
//        // Update room availability
//
//        room.setAvailableRooms(room.getAvailableRooms() - bookingDTO.getNumberOfRooms());
//        room.setBookedRooms(room.getBookedRooms() + bookingDTO.getNumberOfRooms());
//
//        // Save
//
//        roomRepository.save(room);
//        Booking savedBooking = bookingRepository.save(booking);
//
//        // Response update
//
//        bookingDTO.setId(savedBooking.getId());
//        bookingDTO.setTotalAmount(savedBooking.getTotalAmount());
//        bookingDTO.setDueAmount(savedBooking.getDueAmount());
//
//        return bookingDTO;
//    }


    public BookingDTO createBooking(BookingDTO bookingDTO) {
        // Fetch Room
        Room room = roomRepository.findById(bookingDTO.getRoomdto().getId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Fetch Customer
        Customer customer = customerRepository.findById(bookingDTO.getCustomerdto().getId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Fetch Hotel
        Hotel hotel = hotelRepository.findById(bookingDTO.getHoteldto().getId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        // Check availability
        if (room.getAvailableRooms() < bookingDTO.getNumberOfRooms()) {
            throw new RuntimeException("Not enough available rooms");
        }

        // Calculate days between check-in and check-out
        Date checkIn = bookingDTO.getCheckIn();
        Date checkOut = bookingDTO.getCheckOut();

        long diffInMillies = checkOut.getTime() - checkIn.getTime();
        long days = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);

        if (days <= 0) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }

        // Calculate total price
        double totalPrice = room.getPrice() * bookingDTO.getNumberOfRooms() * days;

        // Create Booking entity
        Booking booking = new Booking();
        booking.setContractPersonName(bookingDTO.getContractPersonName());
        booking.setPhone(bookingDTO.getPhone());
        booking.setCheckIn(checkIn);
        booking.setCheckOut(checkOut);
        booking.setAdvanceAmount(bookingDTO.getAdvanceAmount());
        booking.setTotalAmount(totalPrice);
        booking.setDueAmount(totalPrice - bookingDTO.getAdvanceAmount());
        booking.setNumberOfRooms(bookingDTO.getNumberOfRooms());
        booking.setRoom(room);
        booking.setHotel(room.getHotel());
        booking.setCustomer(customer);

        // Update room availability

        room.setAvailableRooms(room.getAvailableRooms() - bookingDTO.getNumberOfRooms());
        room.setBookedRooms(room.getBookedRooms() + bookingDTO.getNumberOfRooms());

        // Save

        roomRepository.save(room);
        Booking savedBooking = bookingRepository.save(booking);

        // Update DTO response

        bookingDTO.setId(savedBooking.getId());
        bookingDTO.setTotalAmount(savedBooking.getTotalAmount());
        bookingDTO.setDueAmount(savedBooking.getDueAmount());

        return bookingDTO;

    }


    // find booking by customer id

    public List<Booking> getBookingsByCustomerId(Long customerId) {
        return bookingRepository.findBookingsByCustomerId(customerId);
    }


    // find booking by hotel id

    public List<Booking> getBookingsByHotelId(Long hotelId) {
        return bookingRepository.findBookingsByHotelId(hotelId);
    }


    // find booking by room id


    public List<Booking> getBookingsByRoomId(Long roomId) {
        return bookingRepository.findBookingsByRoomId(roomId);
    }


    //  Delete booking

    public void deleteBooking(Long id) {
        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Room room = existingBooking.getRoom();



        room.setAvailableRooms(room.getAvailableRooms() + existingBooking.getNumberOfRooms());
        room.setBookedRooms(room.getBookedRooms() - existingBooking.getNumberOfRooms());

        roomRepository.save(room);
        bookingRepository.delete(existingBooking);
    }

}
