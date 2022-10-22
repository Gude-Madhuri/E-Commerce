package com.spring.ecommerce.service;

import com.spring.ecommerce.modal.UploadImageBean;
import org.springframework.web.multipart.MultipartFile;

public interface UploadImageService {
    public UploadImageBean uploadImage(int productId, MultipartFile image, String fileName);
}
