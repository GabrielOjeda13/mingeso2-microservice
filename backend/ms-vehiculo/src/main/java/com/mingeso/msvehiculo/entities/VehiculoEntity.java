package com.mingeso.msvehiculo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vehiculo")
@Getter
@Setter
@NoArgsConstructor
public class VehiculoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    Integer id;

    private String patente;
    private String marca;
    private String modelo;
    private String tipo_vehiculo;
    private String tipo_motor;
    private Integer id_costo;
    private Integer año;
    private Integer km;

}
