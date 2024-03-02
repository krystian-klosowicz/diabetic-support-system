package com.klosowicz.diabetic.support.system.entities;

import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.*;

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

    private LocalDateTime measurement_date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
