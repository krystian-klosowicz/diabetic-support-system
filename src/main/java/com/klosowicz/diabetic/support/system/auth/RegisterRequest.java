package com.klosowicz.diabetic.support.system.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String name;

    private String surname;

    private String email;

    private String password;

    private String phoneNumber;

    private String city;

    private String postalCode;

    private String street;

    private String houseNumber;
}
