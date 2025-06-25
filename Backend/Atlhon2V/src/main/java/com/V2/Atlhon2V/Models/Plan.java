package com.V2.Atlhon2V.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "planes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Plan {
    
    //Atributos Plan
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planID;

    private String nombrePlan;
    private String duracion;
    private String descripcion;
    private String precio;
}
