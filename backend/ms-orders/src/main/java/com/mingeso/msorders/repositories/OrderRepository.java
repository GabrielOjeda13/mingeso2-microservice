package com.mingeso.msorders.repositories;

import com.mingeso.msorders.entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    public OrderEntity findByPatente(String patente);
}
