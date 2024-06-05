package com.mingeso.msvehiculo.repositories;

import com.mingeso.msvehiculo.entities.VehiculoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface VehiculoRepository extends JpaRepository<VehiculoEntity, Long>{

    public VehiculoEntity findByPatente(String patente);

    @Query(value = "SELECT * FROM proyecto_mingeso.vehiculo WHERE vehiculo.patente = :patente", nativeQuery = true)
    VehiculoEntity findByPatenteNativeQuery(@Param("patente") String patente);

}
