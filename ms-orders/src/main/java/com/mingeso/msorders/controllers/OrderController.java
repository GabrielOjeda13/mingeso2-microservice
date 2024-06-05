package com.mingeso.msorders.controllers;

import com.mingeso.msorders.entities.OrderEntity;
import com.mingeso.msorders.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin("*")
public class OrderController {

    OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/")
    public ResponseEntity<List<OrderEntity>> listOrders() {
        List<OrderEntity> orders = orderService.getOrden();
        return ResponseEntity.ok(orders);
    }

}
