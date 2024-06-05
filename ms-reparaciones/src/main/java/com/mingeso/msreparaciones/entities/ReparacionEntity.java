package com.mingeso.msreparaciones.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reparacion")
@Getter
@Setter
@NoArgsConstructor
public class ReparacionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    Integer id;

    private String patente;

    private Integer costo_reparacion;

    private String tipo_reparacion;

    private Date fecha_inicio;

    private Date fecha_termino;

    private Integer id_costo;

}
