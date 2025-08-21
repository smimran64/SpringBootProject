package com.example.HotelBookingManagementSystem.dto;

import com.example.HotelBookingManagementSystem.entity.Customer;
import jakarta.persistence.Column;

import java.sql.Date;

public class CustomerDTO {

    private Long id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String gender;
    private Date dateOfBirth;
    private String image;


    public CustomerDTO() {
    }

    public CustomerDTO(Customer customer) {
        this.id = customer.getId();
        this.name = customer.getName();
        this.email = customer.getEmail();
        this.phone = customer.getPhone();
        this.address = customer.getAddress();
        this.gender = customer.getGender();
        this.dateOfBirth = customer.getDateOfBirth();
        this.image = customer.getImage();

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
