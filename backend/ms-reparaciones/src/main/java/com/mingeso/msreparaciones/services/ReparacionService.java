package com.mingeso.msreparaciones.services;

import com.mingeso.msreparaciones.entities.ReparacionEntity;
import com.mingeso.msreparaciones.repositories.ReparacionRepository;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReparacionService {
    @Autowired
    ReparacionRepository reparacionRepository;
    public ArrayList<ReparacionEntity> getReparaciones(){ return (ArrayList<ReparacionEntity>) reparacionRepository.findAll(); }
    public ArrayList<ReparacionEntity> getReparacionesPatente(String patente){ return (ArrayList<ReparacionEntity>) reparacionRepository.findByreparacionPatente(patente); }
    public ReparacionEntity saveReparacion(ReparacionEntity reparacion){ return reparacionRepository.save(reparacion); }
    public ReparacionEntity getReparacionById(Long id){
        return reparacionRepository.findById(id).get();
    }
    public ReparacionEntity updateReparacion(ReparacionEntity reparacion) { return reparacionRepository.save(reparacion);}

}
