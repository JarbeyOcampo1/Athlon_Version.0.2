package com.V2.Atlhon2V.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.V2.Atlhon2V.Models.Cliente;

public interface ClienteRepositories  extends JpaRepository <Cliente, Long> {
    // Este repositorio permite realizar operaciones CRUD sobre la entidad Cliente
}
