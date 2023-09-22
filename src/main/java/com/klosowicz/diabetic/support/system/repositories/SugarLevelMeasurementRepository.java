package com.klosowicz.diabetic.support.system.repositories;

import com.klosowicz.diabetic.support.system.entities.SugarLevelMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SugarLevelMeasurementRepository extends JpaRepository<SugarLevelMeasurement, Long> {
}
