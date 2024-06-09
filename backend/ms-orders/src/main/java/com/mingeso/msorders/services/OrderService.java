package com.mingeso.msorders.services;


import com.mingeso.msorders.entities.OrderEntity;
import com.mingeso.msorders.entities.OrderReparacionEntity;
import com.mingeso.msorders.repositories.OrderReparacionRepository;
import com.mingeso.msorders.repositories.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
    OrderReparacionRepository orderReparacionRepository;

    public ArrayList<OrderEntity> getOrden(){ return (ArrayList<OrderEntity>) orderRepository.findAll(); }

    public OrderEntity saveOrden(OrderEntity order){ return orderRepository.save(order); }

    public OrderEntity getOrdenById(Integer id){
        return orderRepository.findById(id).get();
    }

    public OrderEntity updateOrder(OrderEntity order) { return orderRepository.save(order);}

}
