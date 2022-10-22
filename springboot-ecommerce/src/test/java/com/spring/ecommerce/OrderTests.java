package com.spring.ecommerce;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.spring.ecommerce.entity.Order;
import com.spring.ecommerce.service.OrderService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase( replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class OrderTests {

    @Autowired
    private OrderService orderService;

    @Test
    public void ordersByUserIdTest() {
        int userId = 2;
        List<Order> orders = orderService.ordersByUserId(userId);

        Assertions.assertNotNull(orders);
        Assertions.assertEquals(4,orders.size());
    }

    @Test
    public void updateStatusByOrderIdTest(){
        int orderId = 95;
        String status = "In-transit";

        orderService.updateStatusByOrderId(orderId, status);

        Order order = orderService.findById(orderId).get();
        Assertions.assertEquals(order.getStatus(), status);

    }
}
