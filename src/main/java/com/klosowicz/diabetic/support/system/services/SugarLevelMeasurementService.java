package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.config.JwtAuthenticationFilter;
import com.klosowicz.diabetic.support.system.entities.SugarLevelMeasurement;
import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.repositories.SugarLevelMeasurementRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import com.klosowicz.diabetic.support.system.requests.SugarLevelAddRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;

import com.klosowicz.diabetic.support.system.requests.SugarLevelUpdateRequest;
import com.klosowicz.diabetic.support.system.requests.responses.SugarLevelResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class SugarLevelMeasurementService {

  private final UserRepository userRepository;
  private final SugarLevelMeasurementRepository sugarRepository;
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  public SugarLevelResponse addMeasurement(
      HttpServletRequest request, SugarLevelAddRequest sugarRequest) {
    User user = getUserFromToken(request);
    SugarLevelMeasurement sugarMeasurement =
        SugarLevelMeasurement.builder()
            .sugar_level(sugarRequest.getSugar_level())
            .measurement_date(LocalDateTime.now())
            .user(user)
            .build();

    return mapToSugarResponse(sugarRepository.save(sugarMeasurement));
  }

  public List<SugarLevelResponse> getMeasurements(HttpServletRequest request) {
    User user = getUserFromToken(request);
    List<SugarLevelMeasurement> measurements = sugarRepository.findAllByUser(user);

    return measurements.stream().map(this::mapToSugarResponse).collect(Collectors.toList());
  }

  public SugarLevelResponse updateMeasurement(
      HttpServletRequest request, SugarLevelUpdateRequest sugarRequest) {
    User user = getUserFromToken(request);
    SugarLevelMeasurement measurement = sugarRepository.findById(sugarRequest.getId()).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.BAD_REQUEST, "Measurement not found with id: " + sugarRequest.getId()));

    if (user != measurement.getUser()) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this measurement");
    }

    measurement.setSugar_level(sugarRequest.getSugar_level());
    sugarRepository.save(measurement);

    return mapToSugarResponse(measurement);
  }

  public void deleteMeasurement(HttpServletRequest request, Long id) {
    User user = getUserFromToken(request);
    SugarLevelMeasurement measurement = sugarRepository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.BAD_REQUEST, "Measurement not found with id: " + id));


    if (user != measurement.getUser()) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this measurement");
    }
    sugarRepository.delete(measurement);
  }

  private SugarLevelResponse mapToSugarResponse(SugarLevelMeasurement measurement) {
    return SugarLevelResponse.builder()
        .id(measurement.getId())
        .sugar_level(measurement.getSugar_level())
        .measurement_date(measurement.getMeasurement_date())
        .build();
  }

  private User getUserFromToken(HttpServletRequest request) {
    Long userId = jwtAuthenticationFilter.getUserIdFromToken(request);
    return userRepository.findById(userId).orElseThrow();
  }
}
