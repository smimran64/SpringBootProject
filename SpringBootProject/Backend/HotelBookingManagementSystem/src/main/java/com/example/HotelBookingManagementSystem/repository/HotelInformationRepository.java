package com.example.HotelBookingManagementSystem.repository;


import com.example.HotelBookingManagementSystem.entity.HotelInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelInformationRepository extends JpaRepository<HotelInformation,Long> {


}
