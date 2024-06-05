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
    Integer id;

    @Column(name = "patente")
        String patente;
    @Column(name = "marca")
        String marca;
    @Column(name = "modelo")
        String modelo;
    @Column(name = "tipo_vehiculo")
        String tipo_vehiculo;
    @Column(name = "tipo_motor")
        String tipo_motor;
    @Column(name = "num_asientos")
        Integer id_costo;
    @Column(name = "año")
        Integer año;
    @Column(name = "km")
        Integer km;

}
