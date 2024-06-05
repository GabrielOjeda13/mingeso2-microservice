package com.mingeso.msvehiculo.controllers;

import com.mingeso.msvehiculo.entities.VehiculoEntity;
import com.mingeso.msvehiculo.services.VehiculoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/vehiculo")
public class VehiculoController {

    @Autowired
    VehiculoService vehiculoService;

    @GetMapping("/")
    public ResponseEntity<List<VehiculoEntity>> listvehiculos() {
        List<VehiculoEntity> vehiculos = vehiculoService.getVehiculos();
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehiculoEntity> getVehiculoById(@PathVariable Long id) {
        VehiculoEntity vehiculo = vehiculoService.getVehiculoById(id);
        return ResponseEntity.ok(vehiculo);
    }

    @GetMapping("/patente/{patente}")
    public ResponseEntity<VehiculoEntity> getVehiculoByPatente(@PathVariable String patente) {
        VehiculoEntity vehiculoPatente = vehiculoService.getVehiculoByPatente(patente);
        return ResponseEntity.ok(vehiculoPatente);
    }

    @PostMapping("/")
    public ResponseEntity<VehiculoEntity> saveVehiculo(@RequestBody VehiculoEntity vehiculo) {
        VehiculoEntity vehiculoNew = vehiculoService.saveVehiculo(vehiculo);
        return ResponseEntity.ok(vehiculoNew);
    }

    @PutMapping("/")
    public ResponseEntity<VehiculoEntity> updateVehiculo(@RequestBody VehiculoEntity vehiculo) {
        VehiculoEntity vehiculoUpdate = vehiculoService.updateVehiculo(vehiculo);
        return ResponseEntity.ok(vehiculoUpdate);
    }
}