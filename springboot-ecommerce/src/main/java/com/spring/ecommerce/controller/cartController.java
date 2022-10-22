package com.spring.ecommerce.controller;

import com.spring.ecommerce.entity.Cart;
import com.spring.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class cartController {

    private CartService cartService;

    @Autowired
    public cartController(CartService theCartService){
        cartService = theCartService;
    }

    @GetMapping("/cart")
    public List<Cart> getAllCart(){
        return cartService.findAll();
    }

    @GetMapping("/cart/{cartId}")
    public Optional<Cart> getCartById(@PathVariable int cartId){
        return cartService.findById(cartId);
    }

    @PostMapping("/cart")
    public Cart addCart(@RequestBody Cart theCart){
        return cartService.save(theCart);
    }

    @PutMapping("/cart")
    public Cart updateCart(@RequestBody Cart theCart){
        return cartService.save(theCart);
    }

    @DeleteMapping("/cart/{cartId}")
    public void deleteCart(@PathVariable int cartId){
        cartService.deleteById(cartId);
    }

    @GetMapping("/cartByUserId/{userId}")
    public List<Cart> getCartByUserId(@PathVariable int userId){
        return cartService.cartByUserid(userId);
    }

    @DeleteMapping("/deleteCartItemsByUserId/{userId}")
    public void deleteCartItemsByUserId(@PathVariable int userId){
        cartService.deleteCartItemsByUserId(userId);
    }
}
