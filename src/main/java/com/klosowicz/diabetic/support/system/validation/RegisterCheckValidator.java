package com.klosowicz.diabetic.support.system.validation;

import static com.klosowicz.diabetic.support.system.entities.enums.Role.ROLE_DOCTOR;
import static com.klosowicz.diabetic.support.system.entities.enums.Role.ROLE_PATIENT;

import com.klosowicz.diabetic.support.system.requests.RegisterRequest;
import java.util.HashMap;
import java.util.Map;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RegisterCheckValidator implements ConstraintValidator<RegisterCheck, RegisterRequest> {
  @Override
  public void initialize(RegisterCheck constraintAnnotation) {}

  @Override
  public boolean isValid(RegisterRequest registerRequest, ConstraintValidatorContext context) {
    boolean isValid = true;
    Map<String, String> validationErrors = new HashMap<>();

    if (registerRequest.getRole() == ROLE_PATIENT) {
      if (registerRequest.getDiabetesType() == null) {
        validationErrors.put("diabetesType", "Diabetes type must be specified for patients");
        isValid = false;
      }
    } else if (registerRequest.getRole() == ROLE_DOCTOR) {
      if (registerRequest.getPwzNumber() == null
          || registerRequest.getPwzNumber().isBlank()
          || !isValidPwzNumber(registerRequest.getPwzNumber())) {
        validationErrors.put("pwzNumber", "Invalid PWZ number format");
        isValid = false;
      }
    }

    if (!isValid) {
      context.disableDefaultConstraintViolation();
      for (Map.Entry<String, String> entry : validationErrors.entrySet()) {
        context
            .buildConstraintViolationWithTemplate(entry.getValue())
            .addPropertyNode(entry.getKey())
            .addConstraintViolation();
      }
    }

    return isValid;
  }

  private boolean isValidPwzNumber(String pwzNumber) {
    // Dodaj tutaj walidację dla formatu PWZ, jeśli jest potrzebna
    return pwzNumber.matches("^[1-9]\\d{6}$");
  }
}
