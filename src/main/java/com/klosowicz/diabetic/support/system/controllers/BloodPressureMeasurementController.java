package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.requests.BloodPressureAddRequest;
import com.klosowicz.diabetic.support.system.requests.BloodPressureUpdateRequest;
import com.klosowicz.diabetic.support.system.requests.responses.BloodPressureResponse;
import com.klosowicz.diabetic.support.system.services.BloodPressureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/blood-pressures")
public class BloodPressureMeasurementController {

    private final BloodPressureService service;

    @PostMapping("/add")
    public ResponseEntity<BloodPressureResponse> addMeasurement(HttpServletRequest httpServletRequest, @RequestBody BloodPressureAddRequest bloodPressureAddRequest) {
        return new ResponseEntity<BloodPressureResponse>(service.addMeasurement(httpServletRequest, bloodPressureAddRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BloodPressureResponse>> getBloodPressureMeasurements(
            HttpServletRequest httpServletRequest) {
        return new ResponseEntity<List<BloodPressureResponse>>(service.getMeasurements( httpServletRequest), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<BloodPressureResponse> updateBloodPressureMeasurement(
            HttpServletRequest httpServletRequest, @RequestBody BloodPressureUpdateRequest bloodPressureUpdateRequest) {
        return new ResponseEntity<BloodPressureResponse>(service.updateMeasurement( httpServletRequest, bloodPressureUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBloodPressureMeasurement(HttpServletRequest httpServletRequest, @PathVariable Long id) {
        service.deleteMeasurement(httpServletRequest, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
