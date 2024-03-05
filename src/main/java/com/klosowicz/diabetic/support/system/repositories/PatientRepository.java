package com.klosowicz.diabetic.support.system.repositories;

import com.klosowicz.diabetic.support.system.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

      List<Patient> findAllByAssignedDoctorId(Long doctorId);

    List<Patient> findAllByAssignedDoctorIsNull();

    Patient findByEmail(String email);
}
