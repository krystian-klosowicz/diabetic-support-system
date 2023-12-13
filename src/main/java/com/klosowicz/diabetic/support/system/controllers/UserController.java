package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.entities.criteria.UserSearchCriteria;
import com.klosowicz.diabetic.support.system.entities.page.UserPage;
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

}
