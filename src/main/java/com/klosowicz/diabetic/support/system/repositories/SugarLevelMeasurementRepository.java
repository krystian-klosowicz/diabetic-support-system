package com.klosowicz.diabetic.support.system.repositories;

import com.klosowicz.diabetic.support.system.entities.SugarLevelMeasurement;
import com.klosowicz.diabetic.support.system.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SugarLevelMeasurementRepository extends JpaRepository<SugarLevelMeasurement, Long> {

    List<SugarLevelMeasurement> findAllByUser(User user);
}
