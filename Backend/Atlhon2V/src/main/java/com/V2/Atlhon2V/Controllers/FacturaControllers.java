package com.V2.Atlhon2V.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.V2.Atlhon2V.Models.Factura;
import com.V2.Atlhon2V.Repositories.FacturaRepositories;

@RestController
@RequestMapping("/api/facturas")
public class FacturaControllers {
    
    @Autowired
    private FacturaRepositories facturaRepositories;

    //obtener todas las facturas
    @GetMapping
    public List <Factura> getAllFacturas () {
        return facturaRepositories.findAll();
    };

    //obtener una factura por id
    @GetMapping("/{facturaID}")
    public Factura getFacuraById (@PathVariable Long facturaID) {
        return facturaRepositories.findById(facturaID).orElse(null);
    };

    //crear factura
    @PostMapping
    public Factura createFactura (@RequestBody Factura factura) {
        return facturaRepositories.save(factura);
    };

    //actualizar factura
    public Factura updateFactura (@PathVariable Long facturaID, @RequestBody Factura factura) {
        factura.setFacturaID(facturaID);
        return facturaRepositories.save(factura);
    };

    //eliminar factura
    public void deleteFactura (@PathVariable Long facturaID) {
        facturaRepositories.deleteById(facturaID);
    }
}
