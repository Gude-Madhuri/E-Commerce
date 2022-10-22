package com.spring.ecommerce;

import com.spring.ecommerce.entity.Product;
import com.spring.ecommerce.service.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase( replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class ProductTests {

    @Autowired
    private ProductService productService;

    @Test
    public void editProductTest(){
        int pid = 59;
        String name = "Bottle";
        int price = 350;
        String description = "Gym Bottle";
        int quantity = 10;
        int categoryId = 104;

        productService.editProduct(pid, name, price, description, quantity, categoryId);

        Product product = productService.findById(pid).get();

        Assertions.assertEquals(name, product.getName());
        Assertions.assertEquals(price, product.getPrice());
        Assertions.assertEquals(description, product.getDescription());
        Assertions.assertEquals(quantity, product.getQuantity());
        Assertions.assertEquals(categoryId, product.getCategoryId());
    }

}
