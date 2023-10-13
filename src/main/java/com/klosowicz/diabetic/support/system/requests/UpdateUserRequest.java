package com.klosowicz.diabetic.support.system.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {

    private String name;

    private String surname;

    private String email;

    private String phoneNumber;

    private String city;

    private String postalCode;

    private String street;

    private String houseNumber;
}

