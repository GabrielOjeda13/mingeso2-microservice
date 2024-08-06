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

    public List<Map<String, Object>> obtenerReporteComparativo(int mes, int año) {
        List<RequestReparacion> reparaciones = obtenerReparaciones();
        List<RequestVehiculo> vehiculos = obtenerVehiculos();

        List<RequestReparacion> reparacionesMesActual = filtrarReparacionesPorMes(reparaciones, mes, año);
        List<RequestReparacion> reparacionesMesAnterior1 = filtrarReparacionesPorMes(reparaciones, mes - 1, año);
        List<RequestReparacion> reparacionesMesAnterior2 = filtrarReparacionesPorMes(reparaciones, mes - 2, año);

        Map<String, Object> reporteMesActual = generarReporte(reparacionesMesActual, vehiculos);
        Map<String, Object> reporteMesAnterior1 = generarReporte(reparacionesMesAnterior1, vehiculos);
        Map<String, Object> reporteMesAnterior2 = generarReporte(reparacionesMesAnterior2, vehiculos);

        List<Map<String, Object>> resultado = new ArrayList<>();
        resultado.add(reporteMesActual);
        resultado.add(reporteMesAnterior1);
        resultado.add(reporteMesAnterior2);

        return resultado;
    }

    private List<RequestReparacion> filtrarReparacionesPorMes(List<RequestReparacion> reparaciones, int mes, int año) {
        return reparaciones.stream()
                .filter(reparacion -> {
                    Date fechaInicio = reparacion.getFecha_inicio();
                    if (fechaInicio == null) {
                        // Puedes manejar los valores nulos aquí, por ejemplo, ignorando o registrando
                        return false; // Ignorar reparaciones sin fecha de inicio
                    }
                    LocalDate fecha = fechaInicio.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    return fecha.getMonthValue() == mes && fecha.getYear() == año;
                })
                .collect(Collectors.toList());
    }

    private Map<String, Object> generarReporte(List<RequestReparacion> reparaciones, List<RequestVehiculo> vehiculos) {
        Map<String, Integer> cantidadPorTipoReparacion = new HashMap<>();
        Map<String, Integer> montoPorTipoReparacion = new HashMap<>();

        for (RequestReparacion reparacion : reparaciones) {
            String tipoReparacion = reparacion.getTipo_reparacion();
            int costo = reparacion.getCosto_reparacion();

            cantidadPorTipoReparacion.merge(tipoReparacion, 1, Integer::sum);
            montoPorTipoReparacion.merge(tipoReparacion, costo, Integer::sum);
        }

        Map<String, Object> reporte = new HashMap<>();
        reporte.put("cantidadPorTipoReparacion", cantidadPorTipoReparacion);
        reporte.put("montoPorTipoReparacion", montoPorTipoReparacion);

        return reporte;
    }
}
