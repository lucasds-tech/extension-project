
package com.safeentry.backend.repository;

import com.safeentry.backend.model.Visitors;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitorsRepository extends JpaRepository<Visitors, Long> {

    boolean existsByDocument(String document);

    Optional<Visitors> findByDocument(String document);
}
