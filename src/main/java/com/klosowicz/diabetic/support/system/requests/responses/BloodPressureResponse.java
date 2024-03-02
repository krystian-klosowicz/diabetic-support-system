package com.klosowicz.diabetic.support.system.requests.responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class BloodPressureResponse {

    private Long id;

    private int sys_pressure;

    private int dia_pressure;

    private int pulse;

    private LocalDateTime measurement_date;
}
