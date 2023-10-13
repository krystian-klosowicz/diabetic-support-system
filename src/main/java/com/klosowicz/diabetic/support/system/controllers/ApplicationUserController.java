package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.requests.UpdateUserRequest;
import com.klosowicz.diabetic.support.system.services.ApplicationUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class ApplicationUserController {

    private final ApplicationUserService applicationUserService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateApplicationUser(@PathVariable Long id, @RequestBody UpdateUserRequest updateUserRequest) {
        return ResponseEntity.ok(applicationUserService.updateApplicationUser(id, updateUserRequest));
    }
}
