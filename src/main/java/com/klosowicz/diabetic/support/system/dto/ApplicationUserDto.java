package com.klosowicz.diabetic.support.system.dto;

import com.klosowicz.diabetic.support.system.entities.Address;
import com.klosowicz.diabetic.support.system.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserDto {

    private Long id;

    private Role role;

    private Address address;

    private String name;

    private String surname;

    private String email;

    private String phoneNumber;

}
