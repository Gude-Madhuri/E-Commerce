package com.spring.ecommerce.service;

import com.spring.ecommerce.dao.ProductRepo;
import com.spring.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImp implements ProductService{

    private ProductRepo productDAO;

    @Autowired
    public ProductServiceImp(ProductRepo theProductDAO){
        productDAO = theProductDAO;
    }
    @Override
    public List<Product> findAll() {
        return productDAO.findAll();
    }

    @Override
    public Optional<Product> findById(int theId) {
        return productDAO.findById(theId);
    }

    @Override
    public Product save(Product theProduct) {
        return productDAO.save(theProduct);
    }

    @Override
    public void deleteById(int theId) {
        productDAO.deleteById(theId);
    }

    @Override
    public void  saveProductToDB(MultipartFile file, String name, String description
            , int price, int quantity, int categoryId)
    {
        Product p = new Product();
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if(fileName.contains(".."))
        {
            System.out.println("not a a valid file");
        }
        try {
            //Base64.getEncoder().encode(file.getBytes())
            p.setImage(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        p.setDescription(description);

        p.setName(name);
        p.setPrice(price);
        p.setDescription(description);
        p.setQuantity(quantity);
        p.setCategoryId(categoryId);

        productDAO.save(p);
    }

    @Override
    @Transactional
    public void editProduct(int id, String name, int price, String description, int quantity, int categoryId) {
        productDAO.editProduct(id,name,price,description,quantity,categoryId);
    }
}
