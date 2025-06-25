package com.V2.Atlhon2V.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.V2.Atlhon2V.Models.Factura;

public interface FacturaRepositories  extends JpaRepository <Factura, Long> {
    //Este repositorio permite realizar operaciones CRUD sobre la entidad Factura   
}
