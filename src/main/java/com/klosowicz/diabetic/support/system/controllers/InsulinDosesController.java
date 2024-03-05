package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.requests.InsulinDosesAddRequest;
import com.klosowicz.diabetic.support.system.requests.InsulinDosesUpdateRequest;
import com.klosowicz.diabetic.support.system.requests.responses.InsulinDosesResponse;
import com.klosowicz.diabetic.support.system.requests.responses.MyProfileResponse;
import com.klosowicz.diabetic.support.system.services.InsulinDosesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/insulin-doses")
public class InsulinDosesController {

    private final InsulinDosesService service;


    @PostMapping("/add")
    public ResponseEntity<InsulinDosesResponse> addInsulinDose(HttpServletRequest httpServletRequest, @RequestBody InsulinDosesAddRequest insulinDosesAddRequest) {
        return new ResponseEntity<InsulinDosesResponse>(service.addMeasurement(httpServletRequest, insulinDosesAddRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<InsulinDosesResponse>> getInsulinDoses(
            HttpServletRequest httpServletRequest) {
        return new ResponseEntity<List<InsulinDosesResponse>>(service.getMeasurements( httpServletRequest), HttpStatus.OK);
    }

    @GetMapping("/get-by-user/{email}")
    public ResponseEntity<List<InsulinDosesResponse>> getInsulinDosesByUser(
            HttpServletRequest httpServletRequest, @PathVariable String email) {
        return new ResponseEntity<List<InsulinDosesResponse>>(service.getMeasurementsByUser( httpServletRequest, email), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<InsulinDosesResponse> updateInsulinDose(
            HttpServletRequest httpServletRequest, @RequestBody InsulinDosesUpdateRequest insulinDosesUpdateRequest) {
        return new ResponseEntity<InsulinDosesResponse>(service.updateMeasurement( httpServletRequest, insulinDosesUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInsulinDose(HttpServletRequest httpServletRequest, @PathVariable Long id) {
        service.deleteMeasurement(httpServletRequest, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
