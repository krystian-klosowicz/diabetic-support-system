package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.dto.ApplicationUserDto;
import com.klosowicz.diabetic.support.system.entities.ApplicationUser;
import com.klosowicz.diabetic.support.system.repositories.ApplicationUserRepository;
import com.klosowicz.diabetic.support.system.requests.SaveAddressRequest;
import com.klosowicz.diabetic.support.system.requests.UpdateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplicationUserService {

    private final ApplicationUserRepository applicationUserRepository;
    private final AddressService addressService;

    public ApplicationUserDto updateApplicationUser(Long id, UpdateUserRequest request) {
        ApplicationUser user = applicationUserRepository.findById(id)
                .orElseThrow(); //TODO wyrzucic wyjatek

        SaveAddressRequest saveAddressRequest = SaveAddressRequest.builder()
                .city(request.getCity())
                .postalCode(request.getPostalCode())
                .street(request.getStreet())
                .houseNumber(request.getHouseNumber())
                .build();

        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());

        addressService.updateAddress(user.getAddress().getId(), saveAddressRequest);

        applicationUserRepository.save(user);

        return ApplicationUserDto.builder()
                .id(user.getId())
                .role(user.getRole())
                .email(user.getEmail())
                .name(user.getName())
                .surname(user.getSurname())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    public Page<ApplicationUser> findAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<ApplicationUser> pharmacyUserPage = applicationUserRepository.findAll(pageable);

        return pharmacyUserPage;
    }

}
