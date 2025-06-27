package com.V2.Atlhon2V.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "facturas")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Factura {
    
    //Atributos Factura
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long facturaID;

    private String fechaFactura;
    private String fechaVencimiento;
    private String totalFactura;

    //Relacion con Cliente (muchos a uno)
    @ManyToOne
    @JoinColumn(name = "clienteid", referencedColumnName = "clienteID")
    private Cliente cliente;

    //Relacion con Plan (muchos a uno)
    @ManyToOne
    @JoinColumn(name = "planid", referencedColumnName = "planID")
    private Plan plan;
}
