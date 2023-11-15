package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.dto.ApplicationUserDto;
import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.exceptions.ResourceNotFoundException;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import com.klosowicz.diabetic.support.system.requests.SaveAddressRequest;
import com.klosowicz.diabetic.support.system.requests.UpdateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository applicationUserRepository;
    private final AddressService addressService;

    public ApplicationUserDto updateApplicationUser(Long id, UpdateUserRequest request) {
        User user = applicationUserRepository.findById(id)
                .orElseThrow(); //TODO wyrzucic wyjatek

        SaveAddressRequest saveAddressRequest = SaveAddressRequest.builder()
                .city(request.getCity())
                .postalCode(request.getPostalCode())
                .street(request.getStreet())
                .houseNumber(request.getHouseNumber())
                .build();

        user.setFirstName(request.getName());
        user.setLastName(request.getSurname());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());

        addressService.updateAddress(user.getAddress().getId(), saveAddressRequest);

        applicationUserRepository.save(user);

        return ApplicationUserDto.builder()
                .id(user.getId())
                .role(user.getRole())
                .email(user.getEmail())
                .name(user.getFirstName())
                .surname(user.getLastName())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    public Page<ApplicationUserDto> findAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<User> pharmacyUserPage = applicationUserRepository.findAll(pageable);

        return pharmacyUserPage.map(user -> new ApplicationUserDto(
                user.getId(),
                user.getRole(),
                user.getAddress(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber()
        ));
    }

    public ApplicationUserDto getById(Long id) {
        User user = applicationUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return  new ApplicationUserDto(
                user.getId(),
                user.getRole(),
                user.getAddress(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }

}
