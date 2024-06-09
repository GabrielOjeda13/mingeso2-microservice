package com.mingeso.msorders.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
@Entity
@Table(name = "order_total")
@Getter
@Setter
@NoArgsConstructor
public class OrderEntity {
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
