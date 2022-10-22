package com.spring.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages={"com.spring.ecommerce"})
public class EcommerceApplication {

	public static void main(String[] args) {
		try {
			SpringApplication.run(EcommerceApplication.class, args);
		}catch( Exception e){
			throw e;
		}
	}

}
