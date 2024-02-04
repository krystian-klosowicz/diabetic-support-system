package com.klosowicz.diabetic.support.system.requests.responses;

import com.klosowicz.diabetic.support.system.entities.Address;
import com.klosowicz.diabetic.support.system.entities.Doctor;
import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import com.klosowicz.diabetic.support.system.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyProfileResponse {

  private Role role;

  @NotBlank
  private String pesel;

  @NotBlank
  private String firstName;

  @NotBlank
  private String lastName;

  private String email;

  @Pattern(regexp = "[1-9]\\d{8}")
  private String phoneNumber;

  private Address address;

  // Patient
  private DoctorProfileResponse assignedDoctor;

  private DiabetesType diabetesType;

  // Doctor
  private String pwzNumber;
}

