package com.spring.ecommerce.dao;

import com.spring.ecommerce.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart,Integer>  {

    @Query("select c from Cart c where c.userId=:userid")
    public List<Cart> cartByUserid(@Param("userid") int userid);

    @Modifying
    @Query("delete from Cart c where c.userId=:userid")
    public void deleteCartItemsByUserId( @Param("userid") int userid );
}
