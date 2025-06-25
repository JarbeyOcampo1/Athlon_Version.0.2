package com.V2.Atlhon2V.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.V2.Atlhon2V.Models.Login;

public interface LoginRepositories extends JpaRepository <Login, Long> {
    //Ese repositorio permite realizar operaciones CRUD sobre la entidad Login
    
    // Método para encontrar un Login por nombre de usuario y contraseña
    Login findByNombreLoginAndPassword (String usuarioLogin, String passwordLogin);
} 
