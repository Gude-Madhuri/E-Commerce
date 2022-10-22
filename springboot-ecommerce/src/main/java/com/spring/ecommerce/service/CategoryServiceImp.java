package com.spring.ecommerce.service;

import com.spring.ecommerce.dao.CategoryRepo;
import com.spring.ecommerce.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImp implements  CategoryService{

    private CategoryRepo categoryDAO;

    @Autowired
    public CategoryServiceImp( CategoryRepo theCategoryDAO ){
        categoryDAO = theCategoryDAO;
    }

    @Override
    public List<Category> findAll() {
        return categoryDAO.findAll();
    }

    @Override
    public Optional<Category> findById(int theId) {
        return categoryDAO.findById(theId);
    }

    @Override
    public Category save(Category theCategory) {
        return categoryDAO.save(theCategory);
    }

    @Override
    public void deleteById(int theId) {
        categoryDAO.deleteById(theId);
    }
}
