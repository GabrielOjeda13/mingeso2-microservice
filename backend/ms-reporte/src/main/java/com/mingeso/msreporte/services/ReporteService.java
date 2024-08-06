package com.mingeso.msreporte.services;

import com.mingeso.msreporte.clients.ReparacionesFeignClient;
import com.mingeso.msreporte.clients.VehiculoFeignClient;
import com.mingeso.msreporte.request.RequestReparacion;
import com.mingeso.msreporte.request.RequestVehiculo;
import jakarta.ws.rs.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;


import java.util.List;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReporteService {

    @Autowired
    private ReparacionesFeignClient reparacionesFeignClient;
    @Autowired
    private VehiculoFeignClient vehiculoFeignClient;


    public List<RequestReparacion> obtenerReparaciones() {
        // Llamada al microservicio de reparaciones para obtener la lista de reparaciones.
        List<RequestReparacion> reparaciones = reparacionesFeignClient.listReparaciones();
        System.out.println("Datos de reparaciones obtenidos: " + reparaciones);
        return reparaciones;
    }

    public List<RequestVehiculo> obtenerVehiculos() {
        List<RequestVehiculo> vehiculos = vehiculoFeignClient.listVehiculos();
        return vehiculos;
    }

    public List<Map<String, Object>> obtenerReporteReparaciones(int mes, int año) {
        List<RequestVehiculo> vehiculos = obtenerVehiculos();
        List<RequestReparacion> reparaciones = obtenerReparaciones();

        List<RequestReparacion> reparacionesFiltradas = reparaciones.stream()
                .filter(reparacion -> {
                    Date fecha = reparacion.getFecha_inicio();
                    if (fecha == null) {
                        return false; // Excluir reparaciones con fecha null
                    }
                    LocalDate localDate = fecha.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    return localDate.getMonthValue() == mes && localDate.getYear() == año;
                })
                .collect(Collectors.toList());

        Map<String, Map<String, Integer>> tipoReparacionPorTipoVehiculo = new HashMap<>();
        Map<String, Integer> totalPorTipoReparacion = new HashMap<>();
        Map<String, Integer> totalPorTipoVehiculo = new HashMap<>();

        for (RequestReparacion reparacion : reparacionesFiltradas) {
            String tipoVehiculo = vehiculos.stream()
                    .filter(vehiculo -> vehiculo.getPatente().equals(reparacion.getPatente()))
                    .map(RequestVehiculo::getTipo_vehiculo)
                    .findFirst()
                    .orElse("Desconocido");

            // Contar reparaciones por tipo de reparación y tipo de vehículo
            tipoReparacionPorTipoVehiculo.computeIfAbsent(reparacion.getTipo_reparacion(), k -> new HashMap<>())
                    .merge(tipoVehiculo, 1, Integer::sum);

            // Sumar el costo total por tipo de reparación
            totalPorTipoReparacion.merge(reparacion.getTipo_reparacion(), reparacion.getCosto_reparacion(), Integer::sum);

            // Contar el total de reparaciones por tipo de vehículo
            totalPorTipoVehiculo.merge(tipoVehiculo, 1, Integer::sum);
        }

        List<Map<String, Object>> resultado = new ArrayList<>();
        for (String tipoReparacion : tipoReparacionPorTipoVehiculo.keySet()) {
            Map<String, Object> reporte = new HashMap<>();
            reporte.put("tipoReparacion", tipoReparacion);
            reporte.put("tipoVehiculoConteo", tipoReparacionPorTipoVehiculo.get(tipoReparacion));
            reporte.put("totalMonto", totalPorTipoReparacion.get(tipoReparacion));
            reporte.put("totalPorTipoVehiculo", totalPorTipoVehiculo); // Agregar total por tipo de vehículo
            resultado.add(reporte);
        }

        return resultado;
    }
}
