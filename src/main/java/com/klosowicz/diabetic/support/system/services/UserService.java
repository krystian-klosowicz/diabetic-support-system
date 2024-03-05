package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.config.JwtAuthenticationFilter;
import com.klosowicz.diabetic.support.system.entities.*;
import com.klosowicz.diabetic.support.system.entities.criteria.UserSearchCriteria;
import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import com.klosowicz.diabetic.support.system.entities.page.UserPage;
import com.klosowicz.diabetic.support.system.exceptions.InvalidRoleException;
import com.klosowicz.diabetic.support.system.repositories.*;
import com.klosowicz.diabetic.support.system.repositories.criteria.UserCriteriaRepository;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.klosowicz.diabetic.support.system.requests.PasswordRequest;
import com.klosowicz.diabetic.support.system.requests.SaveAddressRequest;
import com.klosowicz.diabetic.support.system.requests.responses.DoctorProfileResponse;
import com.klosowicz.diabetic.support.system.requests.responses.MyProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

import static com.klosowicz.diabetic.support.system.services.PasswordGenerator.generatePassword;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PatientRepository patientRepository;
  private final DoctorRepository doctorRepository;
  private final AdminRepository adminRepository;
  private final UserCriteriaRepository userCriteriaRepository;
  private final EmailService emailService;
  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;

  public Page<User> getUsers(UserPage userPage, UserSearchCriteria userSearchCriteria) {
    return userCriteriaRepository.findAllWithFilters(userPage, userSearchCriteria);
  }

  public Optional<User> getUserById(Long id) {
    return userRepository.findById(id);
  }

  public MyProfileResponse getMyProfile(HttpServletRequest request) {
    Long userId = jwtAuthenticationFilter.getUserIdFromToken(request);
    User user = userRepository.findById(userId).orElseThrow();

    return createProfileResponse(user);
  }

  public  List<MyProfileResponse> getPatientsAssignedToDoctor(HttpServletRequest request) {
    Long doctorId = jwtAuthenticationFilter.getUserIdFromToken(request);
    List<Patient> users = patientRepository.findAllByAssignedDoctorId(doctorId);

    return users.stream()
            .sorted(Comparator.comparing(User::getId))
            .map(this::createProfileResponse)
            .collect(Collectors.toList());
  }

  public  List<MyProfileResponse> getPatientsNotAssignedToDoctor(HttpServletRequest request) {
    List<Patient> users = patientRepository.findAllByAssignedDoctorIsNull();

    return users.stream()
            .sorted(Comparator.comparing(User::getId))
            .map(this::createProfileResponse)
            .collect(Collectors.toList());
  }

  public MyProfileResponse assignPatientToDoctor(HttpServletRequest request, MyProfileResponse response) {
    Long doctorId = jwtAuthenticationFilter.getUserIdFromToken(request);
    Patient patient = patientRepository.findByEmail(response.getEmail());
    patient.setAssignedDoctor(doctorRepository.findById(doctorId).orElseThrow());
  patientRepository.save(patient);
    return response;
  }

  public MyProfileResponse unAssignPatient(HttpServletRequest request, MyProfileResponse response) {
    Long doctorId = jwtAuthenticationFilter.getUserIdFromToken(request);
    Patient patient = patientRepository.findByEmail(response.getEmail());
    patient.setAssignedDoctor(null);
    patientRepository.save(patient);
    return response;
  }

  public MyProfileResponse updateAddress(HttpServletRequest request, SaveAddressRequest response) {
    User user = getUserFromToken(request);

    Address address = user.getAddress();
    address.setCity(response.getCity());
    address.setStreet(response.getStreet());
    address.setPostalCode(response.getPostalCode());
    address.setHouseNumber(response.getHouseNumber());
    user.setAddress(address);

    userRepository.save(user);
    return createProfileResponse(user);
  }

  public MyProfileResponse updateUser(HttpServletRequest request, MyProfileResponse response) {
    User user = getUserFromToken(request);
    switch (user.getRole()) {
      case ROLE_PATIENT:
        Patient patient = patientRepository.findById(user.getId()).orElseThrow();
        patient.setPesel(response.getPesel());
        patient.setFirstName(response.getFirstName());
        patient.setLastName(response.getLastName());
        patient.setPhoneNumber(response.getPhoneNumber());
        patient.setDiabetesType(response.getDiabetesType());
        System.out.println(response.getSafetyNumber());
        patient.setSafetyNumber(response.getSafetyNumber());
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
    return createProfileResponse(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  private MyProfileResponse createProfileResponse(User user) {
    DoctorProfileResponse doctorProfileResponse = null;
    DiabetesType diabetesType = null;
    String pwzNumber = null;
    String safetyNumber = null;

    if (user instanceof Patient) {
      Patient patient = (Patient) user;
      if (patient.getAssignedDoctor()!= null) doctorProfileResponse = DoctorProfileResponse.fromDoctor(patient.getAssignedDoctor());
      diabetesType = patient.getDiabetesType();
      safetyNumber = patient.getSafetyNumber();
    } else if (user instanceof Doctor) {
      Doctor doctor = (Doctor) user;
      pwzNumber = doctor.getPwzNumber();
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
            .safetyNumber(safetyNumber)
        .build();
  }


  public void updatePassword(HttpServletRequest request, PasswordRequest passwordRequest) {
    User user = getUserFromToken(request);
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getEmail(), passwordRequest.getOldPassword()));
    user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
    userRepository.save(user);
  }

  public void changeAccountStatus(Long userId) {
    User user = userRepository.findById(userId).orElseThrow();
    user.setActive(!user.isEnabled());
    userRepository.save(user);
  }

  public void sendPasswordReset(Long userId) {
    User user = userRepository.findById(userId).orElseThrow();
    int passwordLength = 8;
    String generatedPassword = generatePassword(passwordLength);
    user.setPassword(passwordEncoder.encode(generatedPassword));
    userRepository.save(user);
    emailService.sendEmail(user.getEmail(), "Your password has been reset", "Hello, your password has been reset.\nYour new password: " + generatedPassword);
  }

  private User getUserFromToken(HttpServletRequest request) {
    Long userId = jwtAuthenticationFilter.getUserIdFromToken(request);
    return userRepository.findById(userId).orElseThrow();
  }
}
