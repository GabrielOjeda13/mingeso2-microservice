package com.mingeso.msreparaciones.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "precio_reparacion")
@Getter
@Setter
@NoArgsConstructor
public class PrecioReparacionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private int number;
    private String tipo_reparacion;
    private int gasolina;
    private int diesel;
    private int hibrido;
    private int electrico;
}
