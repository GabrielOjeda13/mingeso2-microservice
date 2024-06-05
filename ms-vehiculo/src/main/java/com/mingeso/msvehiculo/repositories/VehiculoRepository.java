package com.mingeso.msvehiculo.repositories;

import com.mingeso.msvehiculo.entities.VehiculoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query(value = "SELECT r.tipo_reparacion AS tipoReparacion, " +
            "SUM(CASE WHEN v.tipo_motor = 'Gasolina' THEN 1 ELSE 0 END) AS numVehiculosGasolina, " +
            "SUM(CASE WHEN v.tipo_motor = 'Diesel' THEN 1 ELSE 0 END) AS numVehiculosDiesel, " +
            "SUM(CASE WHEN v.tipo_motor = 'Hibrido' THEN 1 ELSE 0 END) AS numVehiculosHibrido, " +
            "SUM(CASE WHEN v.tipo_motor = 'Electrico' THEN 1 ELSE 0 END) AS numVehiculosElectrico, " +
            "SUM(r.costo_reparacion) AS costoTotal " +
            "FROM ReparacionEntity r " +
            "JOIN VehiculoEntity v ON r.patente = v.patente " +
            "GROUP BY r.tipo_reparacion " +
            "ORDER BY costoTotal DESC")
    List<Object[]> obtenerReporteReparacionesTipoMotor();
}
