package com.klosowicz.diabetic.support.system.requests.responses;

import com.klosowicz.diabetic.support.system.entities.Doctor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorProfileResponse{
  private String email;
  private String firstName;
  private String lastName;
  private String pwzNumber;
  private String phoneNumber;

  public static DoctorProfileResponse fromDoctor(Doctor doctor) {
    return DoctorProfileResponse.builder()
        .email(doctor.getEmail())
        .firstName(doctor.getFirstName())
        .lastName(doctor.getLastName())
        .pwzNumber(doctor.getPwzNumber())
        .phoneNumber(doctor.getPhoneNumber())
        .build();
  }
}
