package com.mingeso.msreporte.clients;

import com.mingeso.msreporte.request.GetListReparacion;
import com.mingeso.msreporte.request.RequestReparacion;
import com.mingeso.msreporte.configurations.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(value = "ms-reparaciones",
        path = "/reparaciones",
configuration = {FeignClientConfig.class})

public interface ReparacionesFeignClient {
    @GetMapping("/")
    List<RequestReparacion> listReparaciones();
}
