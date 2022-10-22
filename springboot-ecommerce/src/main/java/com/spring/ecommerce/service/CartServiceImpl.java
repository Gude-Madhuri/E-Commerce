package com.spring.ecommerce.service;

import com.spring.ecommerce.dao.CartRepo;
import com.spring.ecommerce.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService{

    private CartRepo cartRepo;

    @Autowired
    public CartServiceImpl( CartRepo theCartRepo ){
        cartRepo = theCartRepo;
    }

    @Override
    public List<Cart> findAll() {
        return cartRepo.findAll();
    }

    @Override
    public Optional<Cart> findById(int theId) {
        return cartRepo.findById(theId);
    }

    @Override
    public Cart save(Cart theCart) {
        return cartRepo.save(theCart);
    }

    @Override
    public void deleteById(int theId) {
        cartRepo.deleteById(theId);
    }

    @Override
    public List<Cart> cartByUserid(int userid) {
        return cartRepo.cartByUserid(userid);
    }

    @Override

    public void deleteCartItemsByUserId(int userid) {
        cartRepo.deleteCartItemsByUserId(userid);
    }
}
