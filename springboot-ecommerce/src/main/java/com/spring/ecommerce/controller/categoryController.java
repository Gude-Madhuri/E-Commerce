package com.spring.ecommerce.controller;

import com.spring.ecommerce.entity.Category;
import com.spring.ecommerce.entity.Product;
import com.spring.ecommerce.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class categoryController {

    private CategoryService categoryService;

    @Autowired
    public categoryController( CategoryService theCategoryService){
        categoryService = theCategoryService;
    }

    @GetMapping("/category")
    public List<Category> getAllCategory(){
        return categoryService.findAll();
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategoryId(@PathVariable int categoryId){

//        Optional<Category> theCategory = categoryService.findById(categoryId);
//        List<Product> result = new ArrayList<>();
//        if(theCategory.isPresent()){
//            theCategory.get().getProducts().forEach( item -> {
//                if (item != null ) {
//                    if (item.getImage() != null) {
//                        item.setImage(Base64.getEncoder().encode(item.getImage()));
//                    }
//                    result.add(item);
//                }
//
//            });
//        }
//        return result;
        Optional<Category> theCategory = categoryService.findById(categoryId);
        return theCategory.get().getProducts();
    }

    @PostMapping("/category")
    public Category addCategory( @RequestBody Category theCategory){
        return categoryService.save(theCategory);
    }

    @PutMapping("/category")
    public Category updateCategory( @RequestBody Category theCategory) {
        return categoryService.save(theCategory);
    }

    @DeleteMapping("/category/{categoryId}")
    public void deleteCategory(@PathVariable int categoryId){
        categoryService.deleteById(categoryId);
    }

}
