package com.spring.ecommerce.entity;

import javax.persistence.*;

@Entity
@Table(name="product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="price")
    private int price;

    @Column(name="quantity")
    private int quantity;

    @Column(name="description")
    private String description;

    @Column(name="is_active")
    private boolean isActive;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @Column(length = 256, nullable = true)
    private String fileName;

    @Column(name="category_id")
    private int categoryId;
    public Product(){

    }

    public Product(String name, int price, int quantity, String description, boolean isActive) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.isActive = isActive;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
