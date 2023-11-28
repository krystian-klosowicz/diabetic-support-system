package com.klosowicz.diabetic.support.system.data_loaders;

import com.klosowicz.diabetic.support.system.entities.*;
import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import com.klosowicz.diabetic.support.system.repositories.AddressRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static com.klosowicz.diabetic.support.system.entities.enums.Role.*;

@Component
@RequiredArgsConstructor
public class UserDataLoader implements CommandLineRunner {

  private final UserRepository userRepository;
  private final AddressRepository addressRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) {

    if (userRepository.count() == 0) {

      Address address =
          Address.builder()
              .city("TEST USER'S ADDRESS")
              .houseNumber("0")
              .postalCode("00-000")
              .street("TEST USER'S STREET")
              .build();

      User patientUser =
          Patient.builder()
              .role(ROLE_PATIENT)
              .firstName("patName")
              .lastName("patSurname")
              .email("patient@gmail.com")
              .password(passwordEncoder.encode("PATIENT"))
              .phoneNumber("000000000")
              .dateOfBirth(LocalDate.now())
              .diabetesType(DiabetesType.TYPE_1)
              .build();

      User doctorUser =
          Doctor.builder()
              .role(ROLE_DOCTOR)
              .firstName("docName")
              .lastName("docSurname")
              .email("doctor@gmail.com")
              .password(passwordEncoder.encode("DOCTOR"))
              .phoneNumber("000000000")
              .dateOfBirth(LocalDate.now())
              .pwzNumber("1234567")
              .build();

      User adminUser =
          Admin.builder()
              .role(ROLE_ADMIN)
              .firstName("admName")
              .lastName("admSurname")
              .email("admin@gmail.com")
              .password(passwordEncoder.encode("ADMIN"))
              .phoneNumber("000000000")
              .dateOfBirth(LocalDate.now())
              .adminSince(LocalDate.now())
              .build();

      addressRepository.save(address);
      userRepository.saveAll(List.of(patientUser, doctorUser, adminUser));
    }
  }
}
