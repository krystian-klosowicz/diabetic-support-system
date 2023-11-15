package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.dto.ApplicationUserDto;
import com.klosowicz.diabetic.support.system.exceptions.ResourceNotFoundException;
import com.klosowicz.diabetic.support.system.requests.UpdateUserRequest;
import com.klosowicz.diabetic.support.system.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateApplicationUser(@PathVariable Long id, @RequestBody UpdateUserRequest updateUserRequest) {
        return ResponseEntity.ok(userService.updateApplicationUser(id, updateUserRequest));
    }

    @GetMapping
    public ResponseEntity<Page<ApplicationUserDto>> getUsers(@RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(userService.findAllUsers(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsers(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getById(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Wholesale comapny with ID= " + id + " not found."); // Zwróć wiadomość błędu
        }
    }
}
