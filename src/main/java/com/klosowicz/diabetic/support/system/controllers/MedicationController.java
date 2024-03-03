package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.requests.MedicationAddRequest;
import com.klosowicz.diabetic.support.system.requests.MedicationUpdateRequest;
import com.klosowicz.diabetic.support.system.requests.responses.MedicationResponse;
import com.klosowicz.diabetic.support.system.services.MedicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/medications")
public class MedicationController {

    private final MedicationService service;


    @PostMapping("/add")
    public ResponseEntity<MedicationResponse> addMedication(HttpServletRequest httpServletRequest, @RequestBody MedicationAddRequest medicationAddRequest) {
        return new ResponseEntity<MedicationResponse>(service.addMeasurement(httpServletRequest, medicationAddRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MedicationResponse>> getMedications(
            HttpServletRequest httpServletRequest) {
        return new ResponseEntity<List<MedicationResponse>>(service.getMeasurements( httpServletRequest), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<MedicationResponse> updateMedications(
            HttpServletRequest httpServletRequest, @RequestBody MedicationUpdateRequest medicationUpdateRequest) {
        return new ResponseEntity<MedicationResponse>(service.updateMeasurement( httpServletRequest, medicationUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedication(HttpServletRequest httpServletRequest, @PathVariable Long id) {
        service.deleteMeasurement(httpServletRequest, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
