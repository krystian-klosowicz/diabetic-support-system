package com.klosowicz.diabetic.support.system.entities;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
@SuperBuilder(toBuilder = true)
@Entity
public class Doctor extends User {

  @NotBlank private String pwzNumber;

  @OneToMany(mappedBy = "assignedDoctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Patient> patients;
}
