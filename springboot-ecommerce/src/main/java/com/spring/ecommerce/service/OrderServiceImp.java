package com.spring.ecommerce.service;

import com.spring.ecommerce.dao.OrderRepo;
import com.spring.ecommerce.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImp implements OrderService{

    private OrderRepo orderDAO;

    @Autowired
    public OrderServiceImp( OrderRepo theOrderDAO){
        orderDAO = theOrderDAO;
    }

    @Override
    public List<Order> findAll() {
        return orderDAO.findAll();
    }

    @Override
    public Optional<Order> findById(int theId) {
        return orderDAO.findById(theId);
    }

    @Override
    public Order save(Order theOrder) {
        return orderDAO.save(theOrder);
    }

    @Override
    public void deleteById(int theId) {
        orderDAO.deleteById(theId);
    }

    @Override
    public List<Order> ordersByUserId(int userid) {
        return orderDAO.ordersByUserId(userid);
    }

    @Override
    public void updateStatusByOrderId(int orderId, String status) {
        orderDAO.updateStatusByOrderId(orderId, status);
    }
}
