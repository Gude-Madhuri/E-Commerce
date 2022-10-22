package com.spring.ecommerce.service;

import com.spring.ecommerce.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    public List<Product> findAll();

    public Optional<Product> findById(int theId);

    public Product save(Product theProduct);

    public void deleteById(int theId);

    public void saveProductToDB(MultipartFile file, String name, String description
            , int price, int quantity, int categoryId);

    public void editProduct(int id, String name, int price, String description, int quantity, int categoryId);

}
