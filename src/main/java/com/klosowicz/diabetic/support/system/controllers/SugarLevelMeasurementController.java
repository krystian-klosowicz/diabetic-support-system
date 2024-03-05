package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.requests.SugarLevelAddRequest;
import com.klosowicz.diabetic.support.system.requests.SugarLevelUpdateRequest;
import com.klosowicz.diabetic.support.system.requests.responses.MyProfileResponse;
import com.klosowicz.diabetic.support.system.requests.responses.SugarLevelResponse;
import com.klosowicz.diabetic.support.system.services.SugarLevelMeasurementService;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/sugars")
public class SugarLevelMeasurementController {

    private final SugarLevelMeasurementService sugarService;

    @PostMapping("/add")
    public ResponseEntity<SugarLevelResponse> addMeasurement(HttpServletRequest httpServletRequest, @RequestBody SugarLevelAddRequest sugarLevelAddRequest) {
        return new ResponseEntity<SugarLevelResponse>(sugarService.addMeasurement(httpServletRequest, sugarLevelAddRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SugarLevelResponse>> getSugarMeasurements(
            HttpServletRequest httpServletRequest) {
        return new ResponseEntity<List<SugarLevelResponse>>(sugarService.getMeasurements( httpServletRequest), HttpStatus.OK);
    }

    @GetMapping("/get-by-user/{email}")
    public ResponseEntity<List<SugarLevelResponse>> getSugarMeasurementsByUser(
            HttpServletRequest httpServletRequest, @PathVariable String email) {
        return new ResponseEntity<List<SugarLevelResponse>>(sugarService.getMeasurementsByUser( httpServletRequest, email), HttpStatus.OK);
    }
    @PutMapping
    public ResponseEntity<SugarLevelResponse> updateSugarMeasurement(
            HttpServletRequest httpServletRequest, @RequestBody SugarLevelUpdateRequest sugarLevelUpdateRequest) {
        return new ResponseEntity<SugarLevelResponse>(sugarService.updateMeasurement( httpServletRequest, sugarLevelUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSugarMeasurement(HttpServletRequest httpServletRequest, @PathVariable Long id) {
        sugarService.deleteMeasurement(httpServletRequest, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }





}
