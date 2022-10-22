package com.spring.ecommerce.entity;

import javax.persistence.*;

@Entity
@Table(name="order_line")
public class OrderLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_line_id")
    private int orderLineId;

    @Column(name="order_id")
    private int orderId;

    @Column(name="product_id")
    private int productId;

    @Column(name="quantity")
    private int quantity;

    public OrderLine(){

    }

    public OrderLine(int quantity) {
        this.quantity = quantity;
    }

    public int getOrderLineId() {
        return orderLineId;
    }

    public void setOrderLineId(int orderLineId) {
        this.orderLineId = orderLineId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }
}
