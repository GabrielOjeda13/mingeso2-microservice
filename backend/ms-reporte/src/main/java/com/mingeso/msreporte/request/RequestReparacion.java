package com.mingeso.msreporte.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RequestReparacion {
    Integer id;
    Integer quantity;
    String patente;
    Integer costo_reparacion;
    String tipo_reparacion;
    Date fecha_inicio;
    Date fecha_termino;
    Integer id_costo;
}
