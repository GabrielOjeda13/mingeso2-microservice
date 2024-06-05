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
    @Column(unique = true, nullable = false)
    Integer id;

    private String patente;
    private Date fecha_ingreso;
    private Date fecha_salida;
    private Date fecha_cliente;
    private Integer total_reparaciones;
    private Integer total_descuentos;
    private Integer total_recargos;
    private Integer total_iva;
    private Integer costo_total;

}
