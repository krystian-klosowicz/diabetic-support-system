package com.klosowicz.diabetic.support.system.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidRoleValidator.class)
@Documented
public @interface ValidRole {
    String message() default "Account could not be created with the specified role.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
