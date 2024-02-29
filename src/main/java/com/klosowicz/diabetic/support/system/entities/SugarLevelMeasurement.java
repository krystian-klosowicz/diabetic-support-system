package com.klosowicz.diabetic.support.system.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class SugarLevelMeasurement {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int sugar_level;

  private LocalDateTime measurement_date;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
