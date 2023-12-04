package com.klosowicz.diabetic.support.system.entities;

import java.time.LocalDate;
import javax.persistence.Entity;
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
public class Admin extends User {
  private LocalDate adminSince;
}
