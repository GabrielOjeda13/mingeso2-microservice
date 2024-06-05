package com.mingeso.msorders.controllers;

import com.mingeso.msorders.entities.OrderEntity;
import com.mingeso.msorders.requests.CreateOrderRequest;
import com.mingeso.msorders.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        List<OrderEntity> orders = ordenService.getOrden();
        return ResponseEntity.ok(orders);
    }

    @PostMapping
    public ResponseEntity<String> postOrders(@RequestBody CreateOrderRequest createOrderRequest) {
        this.orderService.createOrder(createOrderRequest);
        return new ResponseEntity<>(
                "orden creada con éxito",
                HttpStatus.OK
        );
    }
    """
    @GetMapping("/{id}")
    public ResponseEntity<CostoEntity> getCostoById(@PathVariable Long id) {
        CostoEntity costo = costoService.getCostoById(id);
        return ResponseEntity.ok(costo);
    }
    @PostMapping("/")
    public ResponseEntity<CostoEntity> saveCosto(@RequestBody CostoEntity costo) {
        CostoEntity costoNew = costoService.saveCosto(costo);
        return ResponseEntity.ok(costoNew);
    }
    @PutMapping("/")
    public ResponseEntity<CostoEntity> updateCosto(@RequestBody CostoEntity costo) {
        CostoEntity costoUpdate = costoService.updateCosto(costo);
        return ResponseEntity.ok(costoUpdate);
    }
    """
}
