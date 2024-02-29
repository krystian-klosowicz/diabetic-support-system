package com.klosowicz.diabetic.support.system.requests;

import lombok.Getter;

@Getter
public class SugarLevelUpdateRequest {

  private Long id;

  private int sugar_level;
}
