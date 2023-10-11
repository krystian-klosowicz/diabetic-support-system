package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.entities.ApplicationUser;
import com.klosowicz.diabetic.support.system.requests.ApplicationUserRegistrationRequest;
import com.klosowicz.diabetic.support.system.services.ApplicationUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final ApplicationUserService applicationUserService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(applicationUserService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(applicationUserService.login(request));
    }

    @GetMapping
    public ResponseEntity<Page<ApplicationUser>> getUsers(@RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(applicationUserService.findAllUsers(page, size));
    }


}
