package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.entities.ApplicationUser;
import com.klosowicz.diabetic.support.system.requests.ApplicationUserRegistrationRequest;
import com.klosowicz.diabetic.support.system.services.ApplicationUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class AuthenticationController {

    private final ApplicationUserService applicationUserService;

    @PostMapping("/register")
    public ResponseEntity<ApplicationUser> registerUser(@RequestBody ApplicationUserRegistrationRequest pharmacyUserRegistrationRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationUserService.registerUser(pharmacyUserRegistrationRequest));
    }

}
