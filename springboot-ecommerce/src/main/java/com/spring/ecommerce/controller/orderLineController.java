package com.spring.ecommerce.controller;

import com.spring.ecommerce.entity.OrderLine;
import com.spring.ecommerce.service.OrderLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class orderLineController {

    private OrderLineService orderLineService;

    @Autowired
    public orderLineController( OrderLineService theOrderLineService ){
        orderLineService = theOrderLineService;
    }

    @GetMapping("/order-lines")
    public List<OrderLine> getAllOrderLines(){
        return orderLineService.findAll();
    }

    @GetMapping("/order-lines/{orderLineId}")
    public Optional<OrderLine> getOrderLineById(@PathVariable int orderLineId ){
        return orderLineService.findById(orderLineId);
    }

    @PostMapping("/order-lines")
    public OrderLine addOrderLine(@RequestBody OrderLine theOrderLine){
        return orderLineService.save(theOrderLine);
    }

    @PutMapping("/order-lines")
    public OrderLine updateOrderLine(@RequestBody OrderLine theOrderLine){
        return orderLineService.save(theOrderLine);
    }

    @DeleteMapping("/order-lines/{orderLineId}")
    public void deleteOrderLine(@PathVariable int orderLineId){
        orderLineService.deleteById(orderLineId);
    }
}
