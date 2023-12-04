package com.klosowicz.diabetic.support.system.data_loaders;

import static com.klosowicz.diabetic.support.system.entities.enums.Role.*;

import com.klosowicz.diabetic.support.system.entities.*;
import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import com.klosowicz.diabetic.support.system.repositories.AddressRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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

      addressRepository.save(address);

      User adminUser =
          Admin.builder()
              .role(ROLE_ADMIN)
              .pesel("99051600000")
              .firstName("admName")
              .lastName("admSurname")
              .email("admin@gmail.com")
              .password(passwordEncoder.encode("ADMIN"))
              .phoneNumber("000000000")
              .dateOfBirth(LocalDate.now())
              .adminSince(LocalDate.now())
              .build();
      userRepository.save(adminUser);

      User doctorUser =
          Doctor.builder()
              .role(ROLE_DOCTOR)
              .pesel("99051600000")
              .firstName("docName")
              .lastName("docSurname")
              .email("doctor@gmail.com")
              .password(passwordEncoder.encode("DOCTOR"))
              .phoneNumber("000000000")
              .dateOfBirth(LocalDate.now())
              .pwzNumber("1234567")
              .build();

      userRepository.save(doctorUser);

      User patientUser =
          Patient.builder()
              .role(ROLE_PATIENT)
              .pesel("99051600000")
              .firstName("patName")
              .lastName("patSurname")
              .email("patient@gmail.com")
              .password(passwordEncoder.encode("PATIENT"))
              .phoneNumber("000000000")
              .dateOfBirth(LocalDate.now())
              .diabetesType(DiabetesType.TYPE_1)
              .assignedDoctor((Doctor) doctorUser)
              .build();

      userRepository.save(patientUser);
    }
  }
}
