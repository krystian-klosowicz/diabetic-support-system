package com.klosowicz.diabetic.support.system.entities;

import com.klosowicz.diabetic.support.system.entities.enums.DiabetesType;
import javax.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

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
