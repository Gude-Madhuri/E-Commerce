package com.spring.ecommerce.service;

import com.spring.ecommerce.entity.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    public List<Order> findAll();

    public Optional<Order> findById(int theId);

    public Order save(Order theOrder);

    public void deleteById(int theId);

    public List<Order> ordersByUserId(int userid);

    public void updateStatusByOrderId(int orderId, String status);

}
