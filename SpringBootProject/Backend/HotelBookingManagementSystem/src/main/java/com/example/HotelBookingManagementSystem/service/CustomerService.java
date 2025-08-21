package com.example.HotelBookingManagementSystem.service;

import com.example.HotelBookingManagementSystem.entity.Customer;
import com.example.HotelBookingManagementSystem.entity.Role;
import com.example.HotelBookingManagementSystem.entity.Token;
import com.example.HotelBookingManagementSystem.entity.User;
import com.example.HotelBookingManagementSystem.jwt.JwtService;
import com.example.HotelBookingManagementSystem.repository.CustomerRepository;
import com.example.HotelBookingManagementSystem.repository.TokenRepository;
import com.example.HotelBookingManagementSystem.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {


    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }


    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    public Customer getProfileByUserId(Long userId) {
        return customerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }





}
