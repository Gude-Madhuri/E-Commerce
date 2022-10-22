package com.spring.ecommerce.service;

import com.spring.ecommerce.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    public List<Category> findAll();

    public Optional<Category> findById(int theId);

    public Category save(Category theCategory);

    public void deleteById(int theId);
}
