package com.mingeso.msorders.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order")
@Getter
@Setter
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "patente")
        String patente;
    @Column(name = "fecha_ingreso")
        Date fecha_ingreso;
    @Column(name = "fecha_salida")
        Date fecha_salida;
    @Column(name = "fecha_cliente")
        Date fecha_cliente;
    @Column(name = "total_reparaciones")
        Integer total_reparaciones;
    @Column(name = "total_descuentos")
        Integer total_descuentos;
    @Column(name = "total_recargos")
        Integer total_recargos;
    @Column(name = "total_iva")
        Integer total_iva;
    @Column(name = "costo_total")
        Integer costo_total;

}
