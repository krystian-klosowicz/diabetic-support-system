package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.entities.Address;
import com.klosowicz.diabetic.support.system.entities.ApplicationUser;
import com.klosowicz.diabetic.support.system.entities.Role;
import com.klosowicz.diabetic.support.system.repositories.AddressRepository;
import com.klosowicz.diabetic.support.system.repositories.ApplicationUserRepository;
import com.klosowicz.diabetic.support.system.requests.ApplicationUserRegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ApplicationUserService {

    private final ApplicationUserRepository applicationUserRepository;
    private final AddressRepository addressRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    //to na dto trzebna zmienic zeby hasla nie zwracalo
    @Transactional
    public ApplicationUser registerUser(ApplicationUserRegistrationRequest registrationRequest) {
        Role role = roleService.findByName("ROLE_PATIENT");

        Address address = Address.builder()
                .city(registrationRequest.getCity())
                .postalCode(registrationRequest.getPostalCode())
                .street(registrationRequest.getStreet())
                .houseNumber(registrationRequest.getHouseNumber())
                .build();

        addressRepository.save(address);

        ApplicationUser newUser = ApplicationUser.builder()
                .role(role)
                .name(registrationRequest.getName())
                .surname(registrationRequest.getSurname())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .phoneNumber(registrationRequest.getPhoneNumber())
                .address(address)
                .build();

        applicationUserRepository.save(newUser);


        return newUser;
    }

    public ApplicationUser getByEmail(String email) {
        return applicationUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }

}
