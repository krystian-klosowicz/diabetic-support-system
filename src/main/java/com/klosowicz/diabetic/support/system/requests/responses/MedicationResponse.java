package com.klosowicz.diabetic.support.system.requests.responses;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MedicationResponse {

    private Long id;

    private String name;

    private double dosage;

    private int freq_per_day;

    private String taking_time;
}
