package com.spring.ecommerce.modal;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.spring.ecommerce.entity.Order;

import javax.persistence.Column;
import java.io.Serializable;

@JsonDeserialize(as = OrderLineBean.class)
public class OrderLineBean implements Serializable {

    private int orderLineId;
    private int orderId;
    private int productId;

    private String name;

    private int price;

    private String description;

    private int quantity;

    public OrderLineBean(){

    }
    public OrderLineBean(int orderLineId, int orderId, int productId, String name, int price, String description, int quantity) {
        this.orderLineId = orderLineId;
        this.orderId = orderId;
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
    }
}
