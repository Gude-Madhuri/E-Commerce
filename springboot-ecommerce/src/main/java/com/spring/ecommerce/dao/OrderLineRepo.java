package com.spring.ecommerce.dao;

import com.spring.ecommerce.entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "order-line" )
public interface OrderLineRepo extends JpaRepository<OrderLine,Integer> {
}
