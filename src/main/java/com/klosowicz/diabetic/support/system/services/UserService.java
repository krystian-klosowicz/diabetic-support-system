package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.config.JwtAuthenticationFilter;
import com.klosowicz.diabetic.support.system.entities.Admin;
import com.klosowicz.diabetic.support.system.entities.Doctor;
import com.klosowicz.diabetic.support.system.entities.Patient;
import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.entities.criteria.UserSearchCriteria;
import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import com.klosowicz.diabetic.support.system.entities.page.UserPage;
import com.klosowicz.diabetic.support.system.exceptions.InvalidRoleException;
import com.klosowicz.diabetic.support.system.repositories.AdminRepository;
import com.klosowicz.diabetic.support.system.repositories.PatientRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import com.klosowicz.diabetic.support.system.repositories.DoctorRepository;
import com.klosowicz.diabetic.support.system.repositories.criteria.UserCriteriaRepository;
import java.util.Optional;

import com.klosowicz.diabetic.support.system.requests.responses.DoctorProfileResponse;
import com.klosowicz.diabetic.support.system.requests.responses.MyProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PatientRepository patientRepository;
  private final DoctorRepository doctorRepository;
  private final AdminRepository adminRepository;
  private final UserCriteriaRepository userCriteriaRepository;
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  public Page<User> getUsers(UserPage userPage, UserSearchCriteria userSearchCriteria) {
    return userCriteriaRepository.findAllWithFilters(userPage, userSearchCriteria);
  }

  public Optional<User> getUserById(Long id) {
    return userRepository.findById(id);
  }

  public MyProfileResponse getMyProfile(HttpServletRequest request) {
    Long userId = jwtAuthenticationFilter.getUserIdFromToken(request);
    User user = userRepository.findById(userId).orElseThrow();

    return createProfileRespnse(user);
  }

  public MyProfileResponse updateUser(HttpServletRequest request, MyProfileResponse response) {
    Long userId = jwtAuthenticationFilter.getUserIdFromToken(request);
    User user = userRepository.findById(userId).orElseThrow();
    switch (user.getRole()) {
      case ROLE_PATIENT:
        Patient patient = patientRepository.findById(user.getId()).orElseThrow();
        patient.setPesel(response.getPesel());
        patient.setFirstName(response.getFirstName());
        patient.setLastName(response.getLastName());
        patient.setPhoneNumber(response.getPhoneNumber());
        patient.setDiabetesType(response.getDiabetesType());
        user = patient;
        break;

      case ROLE_DOCTOR:
        Doctor doctor = doctorRepository.findById(user.getId()).orElseThrow();
        doctor.setPesel(response.getPesel());
        doctor.setFirstName(response.getFirstName());
        doctor.setLastName(response.getLastName());
        doctor.setPhoneNumber(response.getPhoneNumber());
        doctor.setPwzNumber(response.getPwzNumber());
        user = doctor;
        break;

      case ROLE_ADMIN:
        Admin admin = adminRepository.findById(user.getId()).orElseThrow();
        admin.setPesel(response.getPesel());
        admin.setFirstName(response.getFirstName());
        admin.setLastName(response.getLastName());
        admin.setPhoneNumber(response.getPhoneNumber());
        user = admin;
        break;

      default:
        throw new InvalidRoleException("Provided role is not supported.");
    }
    userRepository.save(user);
    return createProfileRespnse(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  private MyProfileResponse createProfileRespnse(User user) {
    DoctorProfileResponse doctorProfileResponse = null;
    DiabetesType diabetesType = null;
    String pwzNumber = null;

    if (user instanceof Patient) {
      Patient patient = (Patient) user;
      doctorProfileResponse = DoctorProfileResponse.fromDoctor(patient.getAssignedDoctor());
      diabetesType = patient.getDiabetesType();
    } else if (user instanceof Doctor) {
      Doctor doctor = (Doctor) user;
      pwzNumber = doctor.getPwzNumber();
      ;
    }

    return MyProfileResponse.builder()
            .role(user.getRole())
            .pesel(user.getPesel())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .email(user.getEmail())
            .phoneNumber(user.getPhoneNumber())
            .address(user.getAddress())
            .assignedDoctor(doctorProfileResponse)
            .diabetesType(diabetesType)
            .pwzNumber(pwzNumber)
            .build();
  }
}
