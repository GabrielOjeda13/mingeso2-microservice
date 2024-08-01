package com.mingeso.msreporte.request;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RequestVehiculo {

    Integer id;
    String patente;
    String marca;
    String modelo;
    String tipo_vehiculo;
    String tipo_motor;
    Integer id_costo;
    Integer año;
    Integer km;
}
