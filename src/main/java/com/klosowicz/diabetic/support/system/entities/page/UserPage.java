package com.klosowicz.diabetic.support.system.entities.page;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class UserPage {

  private int pageNumber = 0;

  private int pageSize = 100;

  private Sort.Direction sortDirection = Sort.Direction.ASC;

  private String sortBy = "id";
}
