package com.klosowicz.diabetic.support.system.requests.responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@Builder
public class InsulinDosesResponse {

  private Long id;

  private int units_of_insulin;

  private LocalTime taking_hour;
}
