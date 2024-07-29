package com.mingeso.msreporte.clients;

import com.mingeso.msreporte.configurations.FeignClientConfig;

import org.springframework.cloud.openfeign.FeignClient;
import org. springframework.web.bind.annotation.GetMapping;

@FeignClient(value = "ms-reparaciones",
        path = "/reparaciones",
configuration = {FeignClientConfig.class})

public interface ReportesFeignClient {
}
