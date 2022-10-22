package com.spring.ecommerce.service;

import com.spring.ecommerce.dao.ProductRepo;
import com.spring.ecommerce.entity.Product;
import com.spring.ecommerce.modal.UploadImageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public class UploadImageServiceImpl implements UploadImageService{
    
    @Autowired
    private ProductRepo productRepo;

    UploadImageBean uploadImageBean = new UploadImageBean();
    @Override
    public UploadImageBean uploadImage(int productId, MultipartFile file, String fileName) {

        try{
            if(file!=null && !file.isEmpty()){
                uploadImageBean.setFileName(!StringUtils.isEmpty(fileName) ? fileName : file.getOriginalFilename());
                uploadImageBean.setImage(file.getBytes());
            }else if(file == null || file.isEmpty()){

            }
        }catch ( Exception e){

        }
        Optional<Product> product  = productRepo.findById(productId);
        
        if( product != null ){
//            product.setImage(uploadImageBean.getImage());
        }
        
        return uploadImageBean;
    }
}
