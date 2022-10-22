package com.spring.ecommerce.service;

import com.spring.ecommerce.dao.OrderLineRepo;
import com.spring.ecommerce.entity.OrderLine;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderLineServiceImp implements OrderLineService{

    private OrderLineRepo orderLineDAO;

    public OrderLineServiceImp( OrderLineRepo theOrderLineDAO ){
        orderLineDAO = theOrderLineDAO;
    }

    @Override
    public List<OrderLine> findAll() {
        return orderLineDAO.findAll();
    }

    @Override
    public Optional<OrderLine> findById(int theId) {
        return orderLineDAO.findById(theId);
    }

    @Override
    public OrderLine save(OrderLine theOrderLine) {
        return orderLineDAO.save(theOrderLine);
    }

    @Override
    public void deleteById(int theId) {
        orderLineDAO.deleteById(theId);
    }
}
