package com.klosowicz.diabetic.support.system.validation;

import com.klosowicz.diabetic.support.system.entities.enums.Role;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidRoleValidator implements ConstraintValidator<ValidRole, Role> {

    @Override
    public void initialize(ValidRole constraintAnnotation) {}

    @Override
    public boolean isValid(Role role, ConstraintValidatorContext context) {
        return role.isTypeEnablesRegistration();
    }
}

