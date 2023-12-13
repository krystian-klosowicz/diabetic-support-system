package com.klosowicz.diabetic.support.system.entities.criteria;

import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import com.klosowicz.diabetic.support.system.entities.enums.Role;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearchCriteria {

  @Enumerated(EnumType.STRING)
  private Role role;

  private String pesel;

  private String firstName;

  private String lastName;

  private String email;

  private String phoneNumber;

  private String pwzNumber;

  @Enumerated(EnumType.STRING)
  private DiabetesType diabetesType;
}
