package com.mingeso.msorders.controllers;

import com.mingeso.msorders.entities.OrderEntity;
import com.mingeso.msorders.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    @Autowired
    OrderService orderService;

    @GetMapping("/")
    public ResponseEntity<List<OrderEntity>> listOrders() {
        List<OrderEntity> orders = orderService.getOrden();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/")
    public ResponseEntity<OrderEntity> saveOrden(@RequestBody OrderEntity order) {
        OrderEntity orderNew = orderService.saveOrden(order);
        return ResponseEntity.ok(orderNew);
    }

}
