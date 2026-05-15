package com.safeentry.backend.repository;

import com.safeentry.backend.model.Residents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentsRepository extends JpaRepository<Residents, Long> {

}
