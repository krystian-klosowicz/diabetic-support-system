package com.klosowicz.diabetic.support.system.entities.enums;

public enum Role {
  ROLE_PATIENT, // PACJENT
  ROLE_DOCTOR, // LEKARZ
  ROLE_ADMIN; // ADMINISTRATOR



  public boolean isTypeEnablesRegistration() {
    return this == ROLE_PATIENT || this == ROLE_DOCTOR;
  }

}


