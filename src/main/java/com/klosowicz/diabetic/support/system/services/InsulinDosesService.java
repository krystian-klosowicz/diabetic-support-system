package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.config.JwtAuthenticationFilter;
import com.klosowicz.diabetic.support.system.entities.InsulinDoses;
import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.repositories.InsulinDosesRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import com.klosowicz.diabetic.support.system.requests.InsulinDosesAddRequest;
import com.klosowicz.diabetic.support.system.requests.InsulinDosesUpdateRequest;
import com.klosowicz.diabetic.support.system.requests.responses.InsulinDosesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InsulinDosesService {

  private final UserRepository userRepository;
  private final InsulinDosesRepository insulinDosesRepository;
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  public InsulinDosesResponse addMeasurement(
      HttpServletRequest request, InsulinDosesAddRequest addRequest) {
    User user = getUserFromToken(request);

    InsulinDoses insulinDoses = InsulinDoses.builder()
            .units_of_insulin(addRequest.getUnits_of_insulin())
            .taking_hour(addRequest.getTaking_hour())
            .user(user)
            .build();

    return mapToInsulinDoseResponse(insulinDosesRepository.save(insulinDoses));
  }

  public List<InsulinDosesResponse> getMeasurements(HttpServletRequest request) {
      User user = getUserFromToken(request);
      List<InsulinDoses> insulinDoses = insulinDosesRepository.findAllByUser(user);

      return insulinDoses.stream()
              .sorted(Comparator.comparing(InsulinDoses::getTaking_hour))
              .map(this::mapToInsulinDoseResponse)
              .collect(Collectors.toList());
  }

  public InsulinDosesResponse updateMeasurement(HttpServletRequest request, InsulinDosesUpdateRequest updateRequest) {
      User user = getUserFromToken(request);
      InsulinDoses measurement = insulinDosesRepository.findById(updateRequest.getId()).orElseThrow(() ->
              new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insulin dose not found with id: " + updateRequest.getId()));

      if (user != measurement.getUser()) {
          throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this insulin dose");
      }

      measurement.setUnits_of_insulin(updateRequest.getUnits_of_insulin());
      measurement.setTaking_hour(updateRequest.getTaking_hour());
      insulinDosesRepository.save(measurement);

      return mapToInsulinDoseResponse(measurement);
  }

    public void deleteMeasurement(HttpServletRequest request, Long id) {
        User user = getUserFromToken(request);
        InsulinDoses measurement = insulinDosesRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insulin dose not found with id: " + id));


        if (user != measurement.getUser()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this insulin dose");
        }
        insulinDosesRepository.delete(measurement);
    }

  private InsulinDosesResponse mapToInsulinDoseResponse(InsulinDoses insulinDoses) {
    return InsulinDosesResponse.builder()
        .id(insulinDoses.getId())
        .units_of_insulin(insulinDoses.getUnits_of_insulin())
        .taking_hour(insulinDoses.getTaking_hour())
        .build();
  }

  private User getUserFromToken(HttpServletRequest request) {
    Long userId = jwtAuthenticationFilter.getUserIdFromToken(request);
    return userRepository.findById(userId).orElseThrow();
  }
}
