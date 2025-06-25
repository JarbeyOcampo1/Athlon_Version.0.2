package com.V2.Atlhon2V.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.V2.Atlhon2V.Models.Plan;

public interface PlanRepositories extends JpaRepository <Plan, Long> {
    // Este repositorio permite realizar operaciones CRUD sobre la entidad Plan
}
