package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.config.JwtService;
import com.klosowicz.diabetic.support.system.entities.Address;
import com.klosowicz.diabetic.support.system.entities.Doctor;
import com.klosowicz.diabetic.support.system.entities.Patient;
import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.exceptions.EmailExistsException;
import com.klosowicz.diabetic.support.system.exceptions.InvalidRoleException;
import com.klosowicz.diabetic.support.system.repositories.AddressRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import com.klosowicz.diabetic.support.system.requests.AuthenticationRequest;
import com.klosowicz.diabetic.support.system.requests.RegisterRequest;
import com.klosowicz.diabetic.support.system.requests.responses.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final AddressRepository addressRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  @Transactional
  public AuthenticationResponse register(RegisterRequest request) {

    if (userRepository.existsByEmail(request.getEmail())) {
      throw new EmailExistsException("Email already exists: " + request.getEmail());
    }

    Address address = Address.builder().build();
    addressRepository.save(address);

    User user;
    switch (request.getRole()) {
      case ROLE_PATIENT:
        user =
            Patient.builder()
                .role(request.getRole())
                .pesel(request.getPesel())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .diabetesType(request.getDiabetesType())
                .address(address)
                    .isActive(true)
                .build();

        userRepository.save(user);
        break;
      case ROLE_DOCTOR:
        user =
            Doctor.builder()
                .role(request.getRole())
                .pesel(request.getPesel())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .pwzNumber(request.getPwzNumber())
                .address(address)
                    .isActive(true)
                .build();

        userRepository.save(user);
        break;
      default:
        throw new InvalidRoleException("Provided role is not supported for registration.");
    }
    return authenticationResponse(user);
  }

  public AuthenticationResponse login(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    var user =
        userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    return authenticationResponse(user);
  }

  private AuthenticationResponse authenticationResponse(User user) {
    String jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder()
        .token(jwtToken)
        .role(user.getRole())
        .id(user.getId())
        .build();
  }
}
