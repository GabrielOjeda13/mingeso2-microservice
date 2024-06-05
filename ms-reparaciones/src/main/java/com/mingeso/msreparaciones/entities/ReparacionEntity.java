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
    Integer id;

    @Column(name = "name")
        String patente;
    @Column(name = "costo_reparacion")
        Integer costo_reparacion;
    @Column(name = "tipo_reparacion")
        String tipo_reparacion;
    @Column(name = "fecha_inicio")
        Date fecha_inicio;
    @Column(name = "fecha_termino")
        Date fecha_termino;
    @Column(name = "id_costo")
        Integer id_costo;

}
