package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.config.JwtAuthenticationFilter;
import com.klosowicz.diabetic.support.system.entities.Medication;
import com.klosowicz.diabetic.support.system.entities.SugarLevelMeasurement;
import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.repositories.MedicationRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import com.klosowicz.diabetic.support.system.requests.MedicationAddRequest;
import com.klosowicz.diabetic.support.system.requests.MedicationUpdateRequest;
import com.klosowicz.diabetic.support.system.requests.responses.MedicationResponse;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class MedicationService {

  private final UserRepository userRepository;
  private final MedicationRepository medicationRepository;
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  public MedicationResponse addMeasurement(
      HttpServletRequest request, MedicationAddRequest medicationAddRequest) {
    User user = getUserFromToken(request);
    Medication medication =
        Medication.builder()
            .name(medicationAddRequest.getName())
            .dosage(medicationAddRequest.getDosage())
            .freq_per_day(medicationAddRequest.getFreq_per_day())
            .taking_time(medicationAddRequest.getTaking_time())
                .user(user)
            .build();

    return mapToMedicationResponse(medicationRepository.save(medication));
  }

  public List<MedicationResponse> getMeasurements(HttpServletRequest request) {
    User user = getUserFromToken(request);
    List<Medication> medications = medicationRepository.findAllByUser(user);
    System.out.println(medications);
    return medications.stream()
        .sorted(Comparator.comparing(Medication::getId))
        .map(this::mapToMedicationResponse)
        .collect(Collectors.toList());
  }

  public MedicationResponse updateMeasurement(
      HttpServletRequest request, MedicationUpdateRequest medicationUpdateRequest) {
    User user = getUserFromToken(request);
    Medication medication =
        medicationRepository
            .findById(medicationUpdateRequest.getId())
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Medication not found with id: " + medicationUpdateRequest.getId()));

    if (user != medication.getUser()) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN, "You are not authorized to update this medication");
    }

    medication.setDosage(medicationUpdateRequest.getDosage());
    medication.setName(medicationUpdateRequest.getName());
    medication.setFreq_per_day(medicationUpdateRequest.getFreq_per_day());
    medication.setTaking_time(medicationUpdateRequest.getTaking_time());
    medicationRepository.save(medication);

    return mapToMedicationResponse(medication);
  }

    public void deleteMeasurement(HttpServletRequest request, Long id) {
        User user = getUserFromToken(request);
        Medication medication = medicationRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.BAD_REQUEST, "Medication not found with id: " + id));


        if (user != medication.getUser()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this medication");
        }
        medicationRepository.delete(medication);
    }

  private MedicationResponse mapToMedicationResponse(Medication medication) {
    return MedicationResponse.builder()
        .id(medication.getId())
        .name(medication.getName())
        .dosage(medication.getDosage())
        .freq_per_day(medication.getFreq_per_day())
        .taking_time(medication.getTaking_time())
        .build();
  }

  private User getUserFromToken(HttpServletRequest request) {
    Long userId = jwtAuthenticationFilter.getUserIdFromToken(request);
    return userRepository.findById(userId).orElseThrow();
  }
}
