package com.safeentry.backend.controller;

import com.safeentry.backend.exception.ResourceNotFoundException;
import com.safeentry.backend.model.Residents;
import com.safeentry.backend.repository.ResidentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ResidentsController {

    @Autowired
    private ResidentsRepository residentsRepository;

    @PostMapping("/residents")
    public Residents createResident(@RequestBody Residents resident) {
        return residentsRepository.save(resident);
    }

    @GetMapping("/residents")
    public List<Residents> getAllResidents() {
        return residentsRepository.findAll();
    }

    @GetMapping("/residents/{id}")
    public Residents getResidentById(@PathVariable Long id) {
        return residentsRepository.findById(id).orElse(null);
    }

    @PutMapping("/residents/{id}")
    public ResponseEntity<Residents> updateResidents(@PathVariable Long id, @RequestBody Residents residentsInfo){
        Residents residents = residentsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Residents not exist with id :" + id));

        residents.setName(residents.getName());
        residents.setLastName(residents.getLastName());
        residents.setDocument(residents.getDocument());

        Residents updatedResidents = residentsRepository.save(residents);
        return ResponseEntity.ok(updatedResidents);
    }

    @DeleteMapping("/residents/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteResidents(@PathVariable Long id){
        Residents residents = residentsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Residents not exist with id :" + id));

        residentsRepository.delete(residents);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Resident deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }
}
