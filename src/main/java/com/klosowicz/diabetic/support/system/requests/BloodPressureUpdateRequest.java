package com.klosowicz.diabetic.support.system.requests;

import lombok.Getter;

@Getter
public class BloodPressureUpdateRequest {

    private Long id;

    private int sys_pressure;

    private int dia_pressure;

    private int pulse;
}
