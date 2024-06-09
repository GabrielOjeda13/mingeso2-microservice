package com.mingeso.msreporte.controllers;

import com.mingeso.msreporte.services.reporteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reporte")
public class ReporteController {

    @Autowired
    ReporteService reporteService;

}