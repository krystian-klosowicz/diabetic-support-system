package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.requests.AuthenticationRequest;
import com.klosowicz.diabetic.support.system.requests.AuthenticationResponse;
import com.klosowicz.diabetic.support.system.requests.RegisterRequest;
import com.klosowicz.diabetic.support.system.config.JwtService;
import com.klosowicz.diabetic.support.system.entities.Address;
import com.klosowicz.diabetic.support.system.entities.ApplicationUser;
import com.klosowicz.diabetic.support.system.entities.Role;
import com.klosowicz.diabetic.support.system.repositories.ApplicationUserRepository;
import com.klosowicz.diabetic.support.system.requests.SaveAddressRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final ApplicationUserRepository applicationUserRepository;
    private final AddressService addressService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        Role role = roleService.findByName("ROLE_PATIENT");

        SaveAddressRequest saveAddressRequest = SaveAddressRequest.builder()
                .city(registerRequest.getCity())
                .postalCode(registerRequest.getPostalCode())
                .street(registerRequest.getStreet())
                .houseNumber(registerRequest.getHouseNumber())
                .build();

        Address address = addressService.createAddress(saveAddressRequest);


        ApplicationUser newUser = ApplicationUser.builder()
                .role(role)
                .name(registerRequest.getName())
                .surname(registerRequest.getSurname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phoneNumber(registerRequest.getPhoneNumber())
                .address(address)
                .build();

        applicationUserRepository.save(newUser);

        String jwtToken = jwtService.generateToken(newUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(role)
                .build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        ApplicationUser user = applicationUserRepository.findByEmail(request.getEmail())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .build();
    }
}
