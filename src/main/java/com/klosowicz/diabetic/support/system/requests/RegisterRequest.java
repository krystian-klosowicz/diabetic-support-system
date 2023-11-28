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

  private String firstName;

  private String lastName;

  private String email;

  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;

  private String phoneNumber;

  private LocalDate dateOfBirth;

//  // Address
//  Chyba do rejestacji jednak nie będzie adresu
//  private String city;
//
//  private String postalCode;
//
//  private String street;
//
//  private String houseNumber;

  // Doctor
  private String pwzNumber;

  // Patient

  @Enumerated(EnumType.STRING)
  private DiabetesType diabetesType;
}
