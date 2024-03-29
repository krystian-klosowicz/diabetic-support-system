package com.klosowicz.diabetic.support.system.repositories;

import com.klosowicz.diabetic.support.system.entities.BloodPressureMeasurement;
import com.klosowicz.diabetic.support.system.entities.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodPressureMeasurementRepository
    extends JpaRepository<BloodPressureMeasurement, Long> {
  List<BloodPressureMeasurement> findAllByUser(User user);
}
