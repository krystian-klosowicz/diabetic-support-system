package com.klosowicz.diabetic.support.system.requests;

import com.klosowicz.diabetic.support.system.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private Role role;
    private String token;
}
