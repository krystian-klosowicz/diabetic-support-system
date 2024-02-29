package com.klosowicz.diabetic.support.system.requests.responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class SugarLevelResponse {

    private Long id;

    private int sugar_level;

    private LocalDateTime measurement_date;
}


