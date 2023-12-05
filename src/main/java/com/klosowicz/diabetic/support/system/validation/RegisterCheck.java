package com.klosowicz.diabetic.support.system.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = RegisterCheckValidator.class)
public @interface RegisterCheck {
    String message() default "Register validation failed";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
