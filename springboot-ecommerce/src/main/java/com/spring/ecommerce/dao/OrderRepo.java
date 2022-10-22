package com.spring.ecommerce.dao;

import com.spring.ecommerce.entity.Cart;
import com.spring.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "order" )
public interface OrderRepo extends JpaRepository<Order,Integer> {
    @Query("select o from Order o where o.userId=:userid")
    public List<Order> ordersByUserId(@Param("userid") int userid);

    @Modifying
    @Query("update Order o set o.status=:status where o.orderId=:orderId")
    public void updateStatusByOrderId(@Param("orderId") int orderId, @Param("status") String status );
}
