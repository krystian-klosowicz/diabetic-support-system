package com.klosowicz.diabetic.support.system.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ApplicationUserRegistrationRequest {

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
