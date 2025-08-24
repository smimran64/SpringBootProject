package com.example.HotelBookingManagementSystem.service;


import com.example.HotelBookingManagementSystem.dto.HotelAdminDTO;
import com.example.HotelBookingManagementSystem.entity.Customer;
import com.example.HotelBookingManagementSystem.entity.HotelAdmin;
import com.example.HotelBookingManagementSystem.repository.HotelAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelAminService {

    @Autowired
    private HotelAdminRepository hotelAdminRepository;


    public List<HotelAdmin> getHotelAdmins() {
        return hotelAdminRepository.findAll();
    }

    public Optional<HotelAdmin> getHotelAdminById(Integer id) {
        return hotelAdminRepository.findById(id);
    }


    public HotelAdmin saveHotelAdmin(HotelAdmin hotelAdmin) {
        return hotelAdminRepository.save(hotelAdmin);
    }

    public void deleteHotelAdmin(Integer id) {
        hotelAdminRepository.deleteById(id);
    }

//    public HotelAdmin getProfileByUserId(Integer userId) {
//        return hotelAdminRepository.findByUserId(userId)
//                .orElseThrow(() -> new RuntimeException("HotelAdmin not found"));
//    }


    public HotelAdminDTO getProfileByUserId(Integer userId) {
        HotelAdmin admin = hotelAdminRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("HotelAdmin not found"));

        return new HotelAdminDTO(
                admin.getId(),
                admin.getName(),
                admin.getEmail(),
                admin.getPhone(),
                admin.getAddress(),
                admin.getGender(),
                admin.getDateOfBirth(),
                admin.getImage()
        );
    }

}
