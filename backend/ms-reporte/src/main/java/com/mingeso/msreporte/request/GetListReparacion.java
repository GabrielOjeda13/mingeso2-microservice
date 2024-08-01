package com.mingeso.msreporte.request;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Setter
@Getter
@NoArgsConstructor
public class GetListReparacion {
    RequestReparacion[] reparaciones;
}
