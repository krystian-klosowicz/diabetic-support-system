package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.config.JwtAuthenticationFilter;
import com.klosowicz.diabetic.support.system.entities.BloodPressureMeasurement;
import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.repositories.BloodPressureMeasurementRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import com.klosowicz.diabetic.support.system.requests.BloodPressureAddRequest;
import com.klosowicz.diabetic.support.system.requests.BloodPressureUpdateRequest;
import com.klosowicz.diabetic.support.system.requests.responses.BloodPressureResponse;
import java.time.LocalDateTime;
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
public class BloodPressureService {

    private final UserRepository userRepository;
    private final BloodPressureMeasurementRepository bloodPressureRepository;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public BloodPressureResponse addMeasurement(
            HttpServletRequest request, BloodPressureAddRequest bloodPressureAddRequest) {
        User user = getUserFromToken(request);
    BloodPressureMeasurement bloodMeasurement =
        BloodPressureMeasurement.builder()
            .dia_pressure(bloodPressureAddRequest.getDia_pressure())
            .sys_pressure(bloodPressureAddRequest.getSys_pressure())
            .pulse(bloodPressureAddRequest.getPulse())
            .measurement_date(LocalDateTime.now())
            .user(user)
            .build();

        return mapToBloodResponse(bloodPressureRepository.save(bloodMeasurement));
    }

    public List<BloodPressureResponse> getMeasurements(HttpServletRequest request) {
        User user = getUserFromToken(request);
        List<BloodPressureMeasurement> measurements = bloodPressureRepository.findAllByUser(user);

        return measurements.stream()
                .sorted(Comparator.comparing(BloodPressureMeasurement::getId))
                .map(this::mapToBloodResponse)
                .collect(Collectors.toList());
    }

    public BloodPressureResponse updateMeasurement(
            HttpServletRequest request, BloodPressureUpdateRequest bloodPressureUpdateRequest) {
        User user = getUserFromToken(request);
        BloodPressureMeasurement measurement = bloodPressureRepository.findById(bloodPressureUpdateRequest.getId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.BAD_REQUEST, "Measurement not found with id: " + bloodPressureUpdateRequest.getId()));

        if (user != measurement.getUser()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this measurement");
        }

    measurement.setDia_pressure(bloodPressureUpdateRequest.getDia_pressure());
    measurement.setSys_pressure(bloodPressureUpdateRequest.getSys_pressure());
    measurement.setPulse(bloodPressureUpdateRequest.getPulse());
        bloodPressureRepository.save(measurement);

        return mapToBloodResponse(measurement);
    }

    private BloodPressureResponse mapToBloodResponse(BloodPressureMeasurement measurement) {
    return BloodPressureResponse.builder()
        .id(measurement.getId())
        .dia_pressure(measurement.getDia_pressure())
        .sys_pressure(measurement.getSys_pressure())
        .pulse(measurement.getPulse())
        .measurement_date(measurement.getMeasurement_date())
        .build();
    }

    public void deleteMeasurement(HttpServletRequest request, Long id) {
        User user = getUserFromToken(request);
        BloodPressureMeasurement measurement = bloodPressureRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.BAD_REQUEST, "Measurement not found with id: " + id));
        if (user != measurement.getUser()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this measurement");
        }

        bloodPressureRepository.delete(measurement);

    }
    
    private User getUserFromToken(HttpServletRequest request) {
        Long userId = jwtAuthenticationFilter.getUserIdFromToken(request);
        return userRepository.findById(userId).orElseThrow();
    }
}
