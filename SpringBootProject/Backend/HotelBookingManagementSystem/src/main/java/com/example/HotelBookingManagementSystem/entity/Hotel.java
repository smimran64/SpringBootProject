package com.example.HotelBookingManagementSystem.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "hotels")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String address;
    private String rating;
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_admin_id")
    private HotelAdmin hotelAdmin;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "hotel-rooms")
    private List<Room> rooms;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "hotel-bookings")
    private List<Booking> bookings;



    public Hotel() {
    }

    public Hotel(long id, String name, String address, String rating, String image, Location location, HotelAdmin hotelAdmin, List<Room> rooms, List<Booking> bookings) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.image = image;
        this.location = location;
        this.hotelAdmin = hotelAdmin;
        this.rooms = rooms;
        this.bookings = bookings;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public HotelAdmin getHotelAdmin() {
        return hotelAdmin;
    }

    public void setHotelAdmin(HotelAdmin hotelAdmin) {
        this.hotelAdmin = hotelAdmin;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }
}
