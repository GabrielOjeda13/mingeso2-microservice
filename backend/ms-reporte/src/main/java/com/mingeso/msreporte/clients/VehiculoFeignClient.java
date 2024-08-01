package com.mingeso.msreporte.clients;


import com.mingeso.msreporte.configurations.FeignClientConfig;
import com.mingeso.msreporte.request.RequestVehiculo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(value = "ms-vehiculo",
        path = "/api/v1/vehiculo",
        configuration = {FeignClientConfig.class})
public interface VehiculoFeignClient {
    @GetMapping("/")
    List<RequestVehiculo> listVehiculos();
}
