package com.example.HotelBookingManagementSystem.restcontroller;


import com.example.HotelBookingManagementSystem.dto.BookingDTO;
import com.example.HotelBookingManagementSystem.entity.Booking;
import com.example.HotelBookingManagementSystem.entity.Room;
import com.example.HotelBookingManagementSystem.repository.BookingRepository;
import com.example.HotelBookingManagementSystem.repository.RoomRepository;
import com.example.HotelBookingManagementSystem.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingRestController {

    private final BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    public BookingRestController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/save")
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        BookingDTO createdBooking = bookingService.createBooking(bookingDTO);
        return ResponseEntity.ok(createdBooking);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Booking>> getBookingsByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(bookingService.getBookingsByCustomerId(customerId));
    }


    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<List<Booking>> getBookingsByHotelId(@PathVariable Long hotelId) {
        return ResponseEntity.ok(bookingService.getBookingsByHotelId(hotelId));
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<Booking>> getBookingsByRoomId(@PathVariable Long roomId) {
        return ResponseEntity.ok(bookingService.getBookingsByRoomId(roomId));
    }


    //  Delete booking
    @DeleteMapping("/{id}")
    public void deleteBooking(Long id) {
        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Room room = existingBooking.getRoom();

        // For cancel Booking to return availability room

        room.setAvailableRooms(room.getAvailableRooms() + existingBooking.getNumberOfRooms());
        room.setBookedRooms(room.getBookedRooms() - existingBooking.getNumberOfRooms());

        roomRepository.save(room);
        bookingRepository.delete(existingBooking);
    }

}
