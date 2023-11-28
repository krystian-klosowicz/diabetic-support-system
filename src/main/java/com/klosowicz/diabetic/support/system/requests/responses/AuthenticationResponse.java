package com.klosowicz.diabetic.support.system.requests.responses;

import com.klosowicz.diabetic.support.system.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private Long id;
    private Role role;
    private String token;
}
