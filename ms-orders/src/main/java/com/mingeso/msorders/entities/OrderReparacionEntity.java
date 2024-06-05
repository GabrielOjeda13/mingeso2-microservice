package com.mingeso.msorders.entities;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order_reparacion")
@Setter
@NoArgsConstructor
public class OrderReparacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "order_id")
    Integer orderId;

    @Column(name = "reparacion_id")
    Integer productId;

}
