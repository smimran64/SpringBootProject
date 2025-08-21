package com.example.HotelBookingManagementSystem.repository;

import com.example.HotelBookingManagementSystem.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

    Optional<Customer> findByUserId(Long id);

    @Query("select c from Customer c where c.user.email = : email")
    Optional<Customer> findByUserEmail(@Param("email") String email);
}
