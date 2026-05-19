package com.safeentry.backend.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "residents")
public class Residents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "The name is required.")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "The lastName is required.")
    @Column(nullable = false)
    private String lastName;

    @NotBlank(message = "The document is required.")
    @Pattern(regexp = "\\d+", message = "The document must contain only numbers.")
    @Column(unique = true, nullable = false)
    private String document;

    @NotBlank(message = "The residence is required.")
    @Column(nullable = false)
    private String residence;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}


