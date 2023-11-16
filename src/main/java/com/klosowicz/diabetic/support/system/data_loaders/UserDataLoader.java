package com.klosowicz.diabetic.support.system.data_loaders;

import com.klosowicz.diabetic.support.system.entities.Address;
import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.repositories.AddressRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static com.klosowicz.diabetic.support.system.entities.Role.*;

@Component
@RequiredArgsConstructor
public class UserDataLoader implements CommandLineRunner {

  private final UserRepository applicationUserRepository;
  private final AddressRepository addressRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) {

    if (applicationUserRepository.count() == 0) {

      Address address =
          Address.builder()
              .city("TEST USER'S ADDRESS")
              .houseNumber("0")
              .postalCode("00-000")
              .street("TEST USER'S STREET")
              .build();

      User patientUser =
          User.builder()
              .role(ROLE_PATIENT)
              .firstName("patName")
              .lastName("patSurname")
              .email("patient@gmail.com")
              .password(passwordEncoder.encode("PATIENT"))
              .address(address)
              .phoneNumber("000000000")
              .dateOfBirth(LocalDate.now())
              .build();

      User doctorUser =
          User.builder()
              .role(ROLE_DOCTOR)
              .firstName("docName")
              .lastName("docSurname")
              .email("doctor@gmail.com")
              .password(passwordEncoder.encode("DOCTOR"))
              .address(address)
              .phoneNumber("000000000")
              .dateOfBirth(LocalDate.now())
              .build();

      User adminUser =
          User.builder()
              .role(ROLE_ADMIN)
              .firstName("admName")
              .lastName("admSurname")
              .email("admin@gmail.com")
              .password(passwordEncoder.encode("ADMIN"))
              .address(address)
              .phoneNumber("000000000")
              .dateOfBirth(LocalDate.now())
              .build();

      addressRepository.save(address);
      applicationUserRepository.saveAll(List.of(patientUser, doctorUser, adminUser));
    }
  }
}
