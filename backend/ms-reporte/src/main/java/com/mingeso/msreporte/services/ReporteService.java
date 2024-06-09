package com.mingeso.msreporte.services;

import com.mingeso.msreporte.repositories.ReporteRepository;
import jakarta.ws.rs.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ReporteService {

    @Autowired
    ReporteRepository reporteRepository;

}
