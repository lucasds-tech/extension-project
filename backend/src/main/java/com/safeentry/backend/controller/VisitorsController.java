package com.safeentry.backend.controller;

import com.safeentry.backend.model.Visitors;
import com.safeentry.backend.repository.VisitorsRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/visitors")
public class VisitorsController {

    private final VisitorsRepository repository;

    public VisitorsController(VisitorsRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public List<Visitors> getAll(){
        return repository.findAll();
    }

    @PostMapping
    public Visitors create(@RequestBody Visitors visitor){
        return repository.save(visitor);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        repository.deleteById(id);
    }
}
