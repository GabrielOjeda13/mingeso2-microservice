package com.mingeso.msreporte.controllers;

import com.mingeso.msreporte.request.RequestReparacion;
import com.mingeso.msreporte.request.RequestVehiculo;
import com.mingeso.msreporte.services.ReporteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reporte")
public class ReporteController {

    @Autowired
    ReporteService reporteService;

    @GetMapping("/reparaciones")
    public ResponseEntity<List<RequestReparacion>> obtenerReparaciones() {
        List<RequestReparacion> reparaciones = reporteService.obtenerReparaciones();
        return ResponseEntity.ok(reparaciones);
    }

    @GetMapping("/vehiculo")
    public ResponseEntity<List<RequestVehiculo>> obtenerVehiculos() {
        List<RequestVehiculo> vehiculos = reporteService.obtenerVehiculos();
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/reporte1")
    public ResponseEntity<List<Map<String, Object>>> obtenerReporteReparaciones(
            @RequestParam int mes,
            @RequestParam int año) {
        List<Map<String, Object>> reporte = reporteService.obtenerReporteReparaciones(mes, año);
        return ResponseEntity.ok(reporte);
    }

    @GetMapping("/")
    public String holaMundo() {
        return "Hola Mundo";
    }
}