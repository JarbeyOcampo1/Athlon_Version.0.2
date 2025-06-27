package com.V2.Atlhon2V.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.V2.Atlhon2V.Models.Plan;
import com.V2.Atlhon2V.Repositories.PlanRepositories;

@RestController
@RequestMapping("/api/planes")
public class PlanControllers {
    
    @Autowired
    private PlanRepositories planRepositories;

    //obtener todos los planes
    @GetMapping
    public List <Plan> getAllPlanes () {
        return planRepositories.findAll();
    }

    //obtener un plan por id
    @GetMapping("/{planID}")
    public Plan getPlanById (@PathVariable Long planID) {
        return planRepositories.findById(planID).orElse(null);
    };

    //Crear plan
    @PostMapping
    public Plan CreatePlan (@RequestBody Plan plan) {
        return planRepositories.save(plan);
    };

    //Actualizar plan
    @PutMapping("/{planID}")
    public Plan updatePlan (@PathVariable Long planID, @RequestBody Plan plan) {
        plan.setPlanID(planID);
        return planRepositories.save(plan);
    };

    //Eliminar plan
    @DeleteMapping("/{planID}")
    public void deletePlan (@PathVariable Long planID) {
        planRepositories.deleteById(planID);
    };
}
