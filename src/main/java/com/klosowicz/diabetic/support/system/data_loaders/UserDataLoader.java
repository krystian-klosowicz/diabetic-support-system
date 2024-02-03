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

      Address address1 =
          Address.builder()
              .city("TEST ADMIN ADDRESS")
              .houseNumber("0")
              .postalCode("00-000")
              .street("TEST ADMIN STREET")
              .build();

      Address address2 =
          Address.builder()
              .city("TEST DOCTOR ADDRESS")
              .houseNumber("0")
              .postalCode("00-000")
              .street("TEST DOCTOR STREET")
              .build();

      Address address3 =
          Address.builder()
              .city("TEST PATIENT ADDRESS")
              .houseNumber("0")
              .postalCode("00-000")
              .street("TEST PATIENT STREET")
              .build();

      Address address4 =
          Address.builder()
              .city("TEST STRING ADDRESS")
              .houseNumber("0")
              .postalCode("00-000")
              .street("TEST STRING STREET")
              .build();

      addressRepository.save(address1);
      addressRepository.save(address2);
      addressRepository.save(address3);
      addressRepository.save(address4);

      User adminUser =
          Admin.builder()
              .role(ROLE_ADMIN)
              .pesel("99051600000")
              .firstName("admName")
              .lastName("admSurname")
              .email("admin@gmail.com")
              .password(passwordEncoder.encode("ADMIN"))
              .phoneNumber("000000000")
              .adminSince(LocalDate.now())
              .address(address1)
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
              .pwzNumber("1234567")
              .address(address2)
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
              .diabetesType(DiabetesType.TYPE_1)
              .assignedDoctor((Doctor) doctorUser)
              .address(address3)
              .build();

      userRepository.save(patientUser);

      User fastUser =
          Admin.builder()
              .role(ROLE_ADMIN)
              .pesel("99051600000")
              .firstName("admName")
              .lastName("admSurname")
              .email("string")
              .password(passwordEncoder.encode("string"))
              .phoneNumber("000000000")
              .adminSince(LocalDate.now())
              .address(address4)
              .build();
      userRepository.save(fastUser);
    }
  }
}
