package com.klosowicz.diabetic.support.system.requests;

import lombok.Getter;

@Getter
public class BloodPressureAddRequest {
    private int sys_pressure;

    private int dia_pressure;

    private int pulse;
}
