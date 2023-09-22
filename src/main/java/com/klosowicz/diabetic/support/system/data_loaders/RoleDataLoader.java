package com.klosowicz.diabetic.support.system.data_loaders;

import com.klosowicz.diabetic.support.system.entities.Address;
import com.klosowicz.diabetic.support.system.entities.ApplicationUser;
import com.klosowicz.diabetic.support.system.entities.Role;
import com.klosowicz.diabetic.support.system.repositories.AddressRepository;
import com.klosowicz.diabetic.support.system.repositories.ApplicationUserRepository;
import com.klosowicz.diabetic.support.system.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RoleDataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final ApplicationUserRepository applicationUserRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args){

        if(roleRepository.count() == 0) {
            Role patient = Role.builder().name("ROLE_PATIENT").build();
            Role doctor = Role.builder().name("ROLE_DOCTOR").build();
            Role admin = Role.builder().name("ROLE_ADMIN").build();

            Address address = Address.builder()
                    .city("TEST USER'S ADDRESS")
                    .houseNumber("0")
                    .postalCode("00-000")
                    .street("TEST USER'S STREET")
                    .build();

            ApplicationUser patientUser = ApplicationUser.builder()
                    .role(patient)
                    .name("patName")
                    .surname("patSurname")
                    .email("patient@gmail.com")
                    .password(passwordEncoder.encode("PATIENT"))
                    .address(address)
                    .phoneNumber("000000000")
                    .build();

            ApplicationUser doctorUser = ApplicationUser.builder()
                    .role(doctor)
                    .name("docName")
                    .surname("docSurname")
                    .email("doctor@gmail.com")
                    .password(passwordEncoder.encode("DOCTOR"))
                    .address(address)
                    .phoneNumber("000000000")
                    .build();

            ApplicationUser adminUser = ApplicationUser.builder()
                    .role(admin)
                    .name("admName")
                    .surname("admSurname")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("ADMIN"))
                    .address(address)
                    .phoneNumber("000000000")
                    .build();

            roleRepository.saveAll(List.of(patient, doctor, admin));
            addressRepository.save(address);
            applicationUserRepository.saveAll(List.of(patientUser, doctorUser, adminUser));
        }

    }
}
