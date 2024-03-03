package com.klosowicz.diabetic.support.system.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class InsulinDoses {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int units_of_insulin;

  private LocalTime taking_hour;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
