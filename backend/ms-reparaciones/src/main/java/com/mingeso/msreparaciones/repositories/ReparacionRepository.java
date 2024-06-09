package com.mingeso.msreparaciones.repositories;

import com.mingeso.msreparaciones.entities.ReparacionEntity;
import com.mingeso.msreparaciones.entities.PrecioReparacionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface ReparacionRepository extends JpaRepository<ReparacionEntity, Long>{

    @Query(value = "SELECT * FROM reparacion WHERE reparacion.patente = :patente", nativeQuery = true)
    List<ReparacionEntity> findByreparacionPatente(@Param("patente") String patente);
    @Query(value = "SELECT * FROM reparacion WHERE reparacion.id = :id", nativeQuery = true)
    ReparacionEntity findByreparacionIdNativeQuery(@Param("id") Long id);
    @Query("SELECT r.tipo_reparacion AS TipoReparacion, " +
            "COUNT(DISTINCT r.patente) AS NumVehiculosReparados, " +
            "SUM(r.costo_reparacion) AS MontoTotal " +
            "FROM ReparacionEntity r " +
            "GROUP BY r.tipo_reparacion " +
            "ORDER BY MontoTotal DESC")
    List<Object[]> obtenerReporteReparaciones();

}
