package com.spring.ecommerce.service;

import com.spring.ecommerce.entity.Cart;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartService {
    public List<Cart> findAll();

    public Optional<Cart> findById(int theId);

    public Cart save(Cart theCart);

    public void deleteById(int theId);

    public List<Cart> cartByUserid( int userid);

    public void deleteCartItemsByUserId(int userid);
}
