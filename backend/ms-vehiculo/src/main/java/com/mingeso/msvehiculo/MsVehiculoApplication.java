package com.mingeso.msvehiculo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MsVehiculoApplication {
	public static void main(String[] args) {
		SpringApplication.run(MsVehiculoApplication.class, args);
	}

}
