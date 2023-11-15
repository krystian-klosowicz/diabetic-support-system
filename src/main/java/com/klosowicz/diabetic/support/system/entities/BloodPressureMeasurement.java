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
public class BloodPressureMeasurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int sys_pressure;

    private int dia_pressure;

    private int pulse;

    private LocalDate measurement_date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
