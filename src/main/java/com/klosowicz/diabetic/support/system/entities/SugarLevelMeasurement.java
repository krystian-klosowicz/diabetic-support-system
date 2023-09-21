package com.klosowicz.diabetic.support.system.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

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

    private LocalDate measurement_date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private ApplicationUser user;
}
