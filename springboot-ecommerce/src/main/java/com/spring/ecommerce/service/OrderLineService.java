package com.spring.ecommerce.service;

import com.spring.ecommerce.entity.OrderLine;

import java.util.List;
import java.util.Optional;

public interface OrderLineService {

    public List<OrderLine> findAll();

    public Optional<OrderLine> findById(int theId);

    public OrderLine save(OrderLine theOrderLine);

    public void deleteById(int theId);

}
