package com.safeentry.backend.repository;
import com.safeentry.backend.model.Residents;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentsRepository extends JpaRepository<Residents, Long> {
    boolean existsByDocument(String document);
    
    Optional<Residents> findByDocument(String document);
}
