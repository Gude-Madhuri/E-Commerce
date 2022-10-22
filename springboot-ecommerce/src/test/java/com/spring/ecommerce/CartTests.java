package com.spring.ecommerce;

import com.spring.ecommerce.entity.Cart;
import com.spring.ecommerce.service.CartService;
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
public class CartTests {

    @Autowired
    private CartService cartService;

    @Test
    public void cartByUseridTest(){
        int userId = 2;
        List<Cart> cart = cartService.cartByUserid(userId);

        Assertions.assertNotNull(cart);
        Assertions.assertEquals(2, cart.size());
    }


}
