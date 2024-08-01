package com.mingeso.msreporte.services;

import com.mingeso.msreporte.clients.ReparacionesFeignClient;
import com.mingeso.msreporte.repositories.ReporteRepository;
import com.mingeso.msreporte.request.GetListReparacion;
import com.mingeso.msreporte.request.RequestReparacion;
import jakarta.ws.rs.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class ReporteService {

    @Autowired
    private ReparacionesFeignClient reparacionesFeignClient;

    public List<RequestReparacion> obtenerReparaciones() {
        // Llamada al microservicio de reparaciones para obtener la lista de reparaciones.
        return reparacionesFeignClient.listReparaciones();
    }
}
