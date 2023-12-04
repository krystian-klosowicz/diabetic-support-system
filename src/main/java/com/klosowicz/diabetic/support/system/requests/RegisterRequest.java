package com.klosowicz.diabetic.support.system.requests;

import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import com.klosowicz.diabetic.support.system.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  @Enumerated(EnumType.STRING)
  private Role role;

  @NotBlank private String pesel;

  private String firstName;

  private String lastName;

  private String email;

  private String password;

  private String phoneNumber;

  private LocalDate dateOfBirth;

  // Doctor
  private String pwzNumber;

  // Patient

  @Enumerated(EnumType.STRING)
  private DiabetesType diabetesType;
}
