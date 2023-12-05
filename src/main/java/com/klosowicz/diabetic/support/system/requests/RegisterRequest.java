package com.klosowicz.diabetic.support.system.requests;

import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import com.klosowicz.diabetic.support.system.entities.enums.Role;
import com.klosowicz.diabetic.support.system.validation.RegisterCheck;
import com.klosowicz.diabetic.support.system.validation.UniqueEmail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RegisterCheck
public class RegisterRequest {

  @Enumerated(EnumType.STRING)
  private Role role;

  @NotBlank(message = "Pesel cannot be blank")
  private String pesel;

  @NotBlank(message = "First name cannot be blank")
  @Size(min = 3, max = 30, message = "Name must be between 3 and 30 characters")
  @Pattern(regexp = "^[\\p{L}0-9\\s\\-.,()]+$", message = "First name can contain letters, digits, spaces, hyphens, periods, commas, parentheses")
  private String firstName;

  @NotBlank(message = "Last name cannot be blank")
  @Size(min = 3, max = 30, message = "Last name must be between 3 and 30 characters")
  @Pattern(regexp = "^[\\p{L}0-9\\s\\-.,()]+$", message = "Last name can contain letters, digits, spaces, hyphens, periods, commas, parentheses")
  private String lastName;

  @Email(message = "Invalid email address")
  @Pattern(
          regexp = "^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",
          message = "Invalid domain name")
  @UniqueEmail
  private String email;

  @NotBlank(message = "Password cannot be blank")
  @Pattern(
          regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
          message =
                  "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit")
  private String password;

  @NotBlank(message = "Phone number cannot be blank")
  @Pattern(regexp = "^[0-9]+$", message = "Phone number must contain only digits")
  @Size(min = 9, max = 9, message = "Phone number must be 9 characters")
  private String phoneNumber;

  // Doctor
  private String pwzNumber;

  // Patient

  @Enumerated(EnumType.STRING)
  private DiabetesType diabetesType;
}
