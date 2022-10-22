package com.spring.ecommerce.dao;

import com.spring.ecommerce.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "category" )
public interface CategoryRepo extends JpaRepository<Category,Integer> {
}
