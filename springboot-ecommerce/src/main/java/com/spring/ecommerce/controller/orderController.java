package com.spring.ecommerce.controller;

import com.spring.ecommerce.dao.ProductRepo;
import com.spring.ecommerce.entity.Order;
import com.spring.ecommerce.entity.OrderLine;
import com.spring.ecommerce.entity.Product;
import com.spring.ecommerce.modal.OrderLineBean;
import com.spring.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class orderController {

    private OrderService orderService;

//    private ProductRepo productRepo;

    @Autowired
    public orderController(OrderService theOrderService){
        orderService = theOrderService;
//        productRepo = theProductRepo;
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders(){
        List<Order> orders =  orderService.findAll();
        return orders;
    }

    @GetMapping("/orders/{orderId}")
    public Optional<Order> getOrderById(@PathVariable int orderId){
        return orderService.findById(orderId);
    }

    @PostMapping("/orders")
    public Order addOrder( @RequestBody Order theOrder){
        return orderService.save(theOrder);
    }

    @PutMapping("/orders")
    public Order updateOrder( @RequestBody Order theOrder){
        return orderService.save(theOrder);
    }

    @DeleteMapping("/orders/{orderId}")
    public void deleteOrder( @PathVariable int orderId ){
        orderService.deleteById(orderId);
    }

    @GetMapping("/ordersByUserId/{userId}")
    public List<Order> ordersByUserId(@PathVariable int userId) {
        return orderService.ordersByUserId(userId);
    }

    @PutMapping("/updateStatusByOrderId")
    public void updateStatusByOrderId(@RequestParam int orderId, @RequestParam String status){
        orderService.updateStatusByOrderId(orderId, status);
    }

//    @GetMapping("/orders-v2/{orderId}")
//    public List<OrderLineBean> getOrderByIdV2(@PathVariable int orderId){
//        Optional<Order> order = orderService.findById(orderId);
//        List<OrderLineBean> beans = new ArrayList<>();
//        if(order.isPresent()) {
//            List<OrderLine> entities = order.get().getOrderLines();
//
//            if(entities!=null && entities.size() > 0) {
//                List<Integer> productIds = entities.stream().map(OrderLine::getProductId).collect(Collectors.toList());
//                List<Product> products = productRepo.findByIds(productIds);
//                Map<Integer, Product> mapper = new HashMap<>();
//                products.forEach(item -> mapper.put(item.getId(), item));
//
//
//                entities.forEach( entity -> {
//                    Product product = mapper.get(entity.getProductId());
//                    OrderLineBean bean = new OrderLineBean(entity.getOrderLineId(), entity.getOrderId(), entity.getProductId(), product.getName(), product.getPrice(), product.getDescription(), product.getQuantity());
//                    beans.add(bean);
//                } );
//            }
//        }
//        return beans;
//    }
}
