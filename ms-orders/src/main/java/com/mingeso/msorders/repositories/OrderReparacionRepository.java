package com.mingeso.msorders.repositories;

import com.mingeso.msorders.entities.OrderReparacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderReparacionRepository extends JpaRepository<OrderReparacionEntity, Integer> {
}
