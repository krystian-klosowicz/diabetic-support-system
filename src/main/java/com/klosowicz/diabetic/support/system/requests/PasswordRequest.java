package com.klosowicz.diabetic.support.system.requests;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class PasswordRequest {


    private String oldPassword;

    @NotBlank(message = "Password cannot be blank")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
            message =
                    "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit")
    private String newPassword;
}

