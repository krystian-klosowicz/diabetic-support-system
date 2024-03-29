package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.entities.criteria.UserSearchCriteria;
import com.klosowicz.diabetic.support.system.entities.page.UserPage;
import com.klosowicz.diabetic.support.system.requests.PasswordRequest;
import com.klosowicz.diabetic.support.system.requests.SaveAddressRequest;
import com.klosowicz.diabetic.support.system.requests.responses.MyProfileResponse;
import com.klosowicz.diabetic.support.system.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  private final UserService userService;

  @GetMapping
  public ResponseEntity<Page<User>> getUsers(
      UserPage userPage, UserSearchCriteria userSearchCriteria) {
    return new ResponseEntity<>(userService.getUsers(userPage, userSearchCriteria), HttpStatus.OK);
  }

  @GetMapping("/assigned-to-doctor")
  public ResponseEntity<List<MyProfileResponse>> getPatientsAssignedToDoctor(
      HttpServletRequest request) {
    return new ResponseEntity<List<MyProfileResponse>>(
        userService.getPatientsAssignedToDoctor(request), HttpStatus.OK);
  }

  @GetMapping("/not-assigned-to-doctor")
  public ResponseEntity<List<MyProfileResponse>> getPatientsNotAssignedToDoctor(
      HttpServletRequest request) {
    return new ResponseEntity<List<MyProfileResponse>>(
        userService.getPatientsNotAssignedToDoctor(request), HttpStatus.OK);
  }

  @PutMapping("/assign-to-doctor")
  public ResponseEntity<MyProfileResponse> assignToDoctor(
      HttpServletRequest request, @RequestBody MyProfileResponse response) {
    return new ResponseEntity<MyProfileResponse>(
        userService.assignPatientToDoctor(request, response), HttpStatus.OK);
  }

  @PutMapping("/un-assign-patient")
  public ResponseEntity<MyProfileResponse> unAssignPatient(
      HttpServletRequest request, @RequestBody MyProfileResponse response) {
    return new ResponseEntity<MyProfileResponse>(
        userService.unAssignPatient(request, response), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    return userService
        .getUserById(id)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping("/my-profile")
  public ResponseEntity<MyProfileResponse> getMyProfile(HttpServletRequest request) {
    return ResponseEntity.ok(userService.getMyProfile(request));
  }

  @PutMapping
  public ResponseEntity<MyProfileResponse> updateUser(
      HttpServletRequest request, @Valid @RequestBody MyProfileResponse response) {
    return ResponseEntity.ok(userService.updateUser(request, response));
  }

  @PutMapping("/update-address")
  public ResponseEntity<MyProfileResponse> updateAddress(
      HttpServletRequest request, @Valid @RequestBody SaveAddressRequest saveAddressRequest) {
    return ResponseEntity.ok(userService.updateAddress(request, saveAddressRequest));
  }

  @PutMapping("/change-password")
  public ResponseEntity<?> updatePassword(
      HttpServletRequest request, @Valid @RequestBody PasswordRequest passwordRequest) {
    userService.updatePassword(request, passwordRequest);
    return ResponseEntity.ok().build();
  }

  @PutMapping("/change-account-status/{id}")
  public ResponseEntity<?> changeAccountStatus(@PathVariable Long id) {
    userService.changeAccountStatus(id);
    return ResponseEntity.ok().build();
  }

  @PutMapping("/reset-password/{id}")
  public ResponseEntity<?> sendPasswordReset(@PathVariable Long id) {
    userService.sendPasswordReset(id);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    return userService
        .getUserById(id)
        .map(
            existingEmployee -> {
              userService.deleteUser(id);
              return ResponseEntity.ok().build();
            })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }
}
