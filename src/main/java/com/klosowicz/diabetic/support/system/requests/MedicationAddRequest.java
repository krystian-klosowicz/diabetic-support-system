package com.klosowicz.diabetic.support.system.requests;

import lombok.Getter;

@Getter

public class MedicationAddRequest {

    private String name;

    private double dosage;

    private int freq_per_day;

    private String taking_time;
}
