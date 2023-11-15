package com.klosowicz.diabetic.support.system.requests;

import com.klosowicz.diabetic.support.system.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String name;

    private String surname;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String phoneNumber;

    private String city;

    private String postalCode;

    private String street;

    private String houseNumber;
}
