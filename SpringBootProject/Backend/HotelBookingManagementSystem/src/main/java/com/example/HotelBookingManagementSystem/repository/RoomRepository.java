package com.example.HotelBookingManagementSystem.repository;


import com.example.HotelBookingManagementSystem.entity.Hotel;
import com.example.HotelBookingManagementSystem.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {


    @Query("select r from  Room r where r.hotel.name= :hotelName")
    List<Room> findRoomByHotelName(@Param("hotelName") String hotelName);


    List<Room> findByHotelId(long hotelId);

    @Query("Select r from Room r Where r.hotel.id= :hotelid")
    public List<Room> findRoomByHotelId(@Param("hotelid") long hotelid);


}
