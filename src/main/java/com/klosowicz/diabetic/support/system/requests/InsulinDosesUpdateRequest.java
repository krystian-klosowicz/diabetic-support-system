package com.klosowicz.diabetic.support.system.requests;

import lombok.Getter;

import java.time.LocalTime;

@Getter
public class InsulinDosesUpdateRequest {

  private Long id;

  private int units_of_insulin;

  private LocalTime taking_hour;
}
