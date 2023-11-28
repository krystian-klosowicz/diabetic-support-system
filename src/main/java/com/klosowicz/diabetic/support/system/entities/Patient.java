package com.klosowicz.diabetic.support.system.entities;

import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
@SuperBuilder(toBuilder = true)
@Entity
public class Patient extends User {
  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private Doctor assignedDoctor;

  @Enumerated(EnumType.STRING)
  private DiabetesType diabetesType;
}
