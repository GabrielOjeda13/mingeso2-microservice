package com.mingeso.msreparaciones.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.mingeso.msreparaciones.entities.PrecioReparacionEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PrecioReparacionRepository extends JpaRepository<PrecioReparacionEntity, Long>{

    @Query(value = "SELECT * FROM precio_reparacion WHERE precio.number = :number", nativeQuery = true)
    List<PrecioReparacionEntity> findByPrecio(@Param("number") int number);

    @Query(value = "SELECT * FROM precio_reparacion WHERE precio.tipo_reparacion = :tipo_reparacion", nativeQuery = true)
    PrecioReparacionEntity findByTipo(@Param("tipo_reparacion") String tipo_reparacion);

}
