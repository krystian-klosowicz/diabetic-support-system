package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.requests.AuthenticationRequest;
import com.klosowicz.diabetic.support.system.requests.AuthenticationResponse;
import com.klosowicz.diabetic.support.system.requests.RegisterRequest;
import com.klosowicz.diabetic.support.system.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

}
