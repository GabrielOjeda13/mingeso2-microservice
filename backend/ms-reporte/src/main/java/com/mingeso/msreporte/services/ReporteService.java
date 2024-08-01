package com.mingeso.msreporte.services;

import com.mingeso.msreporte.clients.ReparacionesFeignClient;
import com.mingeso.msreporte.clients.VehiculoFeignClient;
import com.mingeso.msreporte.repositories.ReporteRepository;
import com.mingeso.msreporte.request.GetListReparacion;
import com.mingeso.msreporte.request.RequestReparacion;
import com.mingeso.msreporte.request.RequestVehiculo;
import jakarta.ws.rs.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class ReporteService {

    @Autowired
    private ReparacionesFeignClient reparacionesFeignClient;
    @Autowired
    private VehiculoFeignClient vehiculoFeignClient;

    private static final Logger LOGGER = Logger.getLogger(ReporteService.class.getName());

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
}
