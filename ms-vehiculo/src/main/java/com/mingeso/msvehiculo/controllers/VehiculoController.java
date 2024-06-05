package com.mingeso.msvehiculo.controllers;

import com.mingeso.msvehiculo.entities.VehiculoEntity;
import com.mingeso.msvehiculo.services.VehiculoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/reparacion")
public class ReparacionController {

    @Autowired
    ReparacionService reparacionService;

    @GetMapping("/")
    public ResponseEntity<List<ReparacionEntity>> listReparacion() {
        List<ReparacionEntity> reparaciones = reparacionService.getReparaciones();
        return ResponseEntity.ok(reparaciones);
    }

    @GetMapping("/patente/{patente}")
    public ResponseEntity<List<ReparacionEntity>> listReparacionByPatente(@PathVariable String patente) {
        List<ReparacionEntity> reparacionesPatente = reparacionService.getReparacionesPatente(patente);
        return ResponseEntity.ok(reparacionesPatente);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReparacionEntity> getReparacionById(@PathVariable Long id) {
        ReparacionEntity reparacion = reparacionService.getReparacionById(id);
        return ResponseEntity.ok(reparacion);
    }

    @PostMapping("/")
    public ResponseEntity<ReparacionEntity> saveReparacion(@RequestBody ReparacionEntity reparacion) {
        ReparacionEntity reparacionNew = reparacionService.saveReparacion(reparacion);
        return ResponseEntity.ok(reparacionNew);
    }

    @PutMapping("/")
    public ResponseEntity<ReparacionEntity> updateReparacion(@RequestBody ReparacionEntity reparacion) {
        ReparacionEntity reparacionUpdate = reparacionService.updateReparacion(reparacion);
        return ResponseEntity.ok(reparacionUpdate);
    }

}