package com.spring.ecommerce.dao;

import com.spring.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "product" )
public interface ProductRepo extends JpaRepository<Product,Integer> {

    @Query("from Product where id in :productIds ")
    List<Product> findByIds(@Param("productIds") List<Integer> productIds);

    @Modifying
    @Query("update Product p set p.name=:name," +
            " p.price=:price," +
            " p.description=:description," +
            " p.quantity=:quantity," +
            " p.categoryId=:categoryId" +
            " where p.id=:id")
    public void editProduct(@Param("id") int id,
                              @Param("name") String name,
                              @Param("price") int price,
                              @Param("description") String description,
                              @Param("quantity") int quantity,
                              @Param("categoryId") int categoryId);
}
