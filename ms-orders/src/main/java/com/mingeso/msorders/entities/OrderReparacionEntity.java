package com.mingeso.msorders.entities;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order_reparacion")
@Setter
@NoArgsConstructor
public class OrderReparacionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    Integer id;

    private Integer orderId;

    private Integer productId;

}
