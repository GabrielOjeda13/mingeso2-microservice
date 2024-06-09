package com.mingeso.msreparaciones.services;
import com.mingeso.msreparaciones.entities.PrecioReparacionEntity;
import com.mingeso.msreparaciones.repositories.PrecioReparacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class PrecioReparacionService {
    @Autowired
    PrecioReparacionRepository precioReparacionRepository;
    public ArrayList<PrecioReparacionEntity> getPrecios(){ return (ArrayList<PrecioReparacionEntity>) precioReparacionRepository.findAll(); }
    public PrecioReparacionEntity savePrecio(PrecioReparacionEntity precio){ return precioReparacionRepository.save(precio); }
    public PrecioReparacionEntity getPrecioById(Long id){ return precioReparacionRepository.findById(id).get();}
    public PrecioReparacionEntity getPrecioByTipo(String tipo_reparacion){return precioReparacionRepository.findByTipo(tipo_reparacion);}
    public PrecioReparacionEntity updatePrecio(PrecioReparacionEntity precio) { return precioReparacionRepository.save(precio);}
}
