package com.mingeso.msreparaciones.controllers;

import com.mingeso.msreparaciones.entities.ReparacionEntity;
import com.mingeso.msreparaciones.entities.PrecioReparacionEntity;
import com.mingeso.msreparaciones.repositories.PrecioReparacionRepository;
import com.mingeso.msreparaciones.services.PrecioReparacionService;
import com.mingeso.msreparaciones.services.ReparacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reparaciones")
public class ReparacionController {

    @Autowired
    ReparacionService reparacionService;
    @Autowired
    PrecioReparacionService precioReparacionService;

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

    @GetMapping("/precio/")
    public ResponseEntity<List<PrecioReparacionEntity>> listPrecios() {
        List<PrecioReparacionEntity> precios = precioReparacionService.getPrecios();
        return ResponseEntity.ok(precios);
    }

    @GetMapping("/precio/{id}")
    public ResponseEntity<PrecioReparacionEntity> getPrecioById(@PathVariable Long id) {
        PrecioReparacionEntity precio = precioReparacionService.getPrecioById(id);
        return ResponseEntity.ok(precio);
    }

    @GetMapping("/precio/tipo/{tipo}")
    public ResponseEntity<PrecioReparacionEntity> getPrecioByTipo(@PathVariable String tipo) {
        PrecioReparacionEntity precioTipo = precioReparacionService.getPrecioByTipo(tipo);
        return ResponseEntity.ok(precioTipo);
    }

    @PostMapping("/precio/")
    public ResponseEntity<PrecioReparacionEntity> saveReparacion(@RequestBody PrecioReparacionEntity precio) {
        PrecioReparacionEntity precioNew = precioReparacionService.savePrecio(precio);
        return ResponseEntity.ok(precioNew);
    }

}