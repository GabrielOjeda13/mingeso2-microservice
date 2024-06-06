package com.mingeso.msreparaciones;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MsReparacionApplication {
	public static void main(String[] args) {
		SpringApplication.run(MsReparacionApplication.class, args);
	}

}
