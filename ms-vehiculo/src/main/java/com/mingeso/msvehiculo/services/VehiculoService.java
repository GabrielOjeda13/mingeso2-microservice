package com.mingeso.msvehiculo.services;

import com.mingeso.msvehiculo.entities.VehiculoEntity;
import com.mingeso.msvehiculo.repositories.VehiculoRepository;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class VehiculoService {

    @Autowired
    VehiculoRepository vehiculoRepository;

    public ArrayList<VehiculoEntity> getVehiculos(){
        return (ArrayList<VehiculoEntity>) vehiculoRepository.findAll();
    }

    public VehiculoEntity saveVehiculo(VehiculoEntity vehiculo){
        return vehiculoRepository.save(vehiculo);
    }

    public VehiculoEntity getVehiculoById(Long id){
        return vehiculoRepository.findById(id).get();
    }

    public VehiculoEntity getVehiculoByPatente(String patente){
        return vehiculoRepository.findByPatenteNativeQuery(patente);
    }

    public VehiculoEntity updateVehiculo(VehiculoEntity vehiculo) { return vehiculoRepository.save(vehiculo);}
}
