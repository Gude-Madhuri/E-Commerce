package com.spring.ecommerce.controller;

import com.spring.ecommerce.entity.Product;
import com.spring.ecommerce.modal.UploadImageBean;
import com.spring.ecommerce.service.ProductService;
import com.spring.ecommerce.service.UploadImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class productController {


    private ProductService productService;

//    @Autowired
//    private UploadImageService uploadImageService;



    @Autowired
    public productController( ProductService theProductService){
        productService = theProductService;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productService.findAll();
    }

    @GetMapping("/products/{productId}")
    public Optional<Product> getProductById( @PathVariable int productId ){
        return productService.findById(productId);
    }

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product theProduct ){
        return productService.save(theProduct);
    }

    @PutMapping("/products")
    public Product updateProduct(@RequestBody Product theProduct ){
        return productService.save(theProduct);
    }

    @DeleteMapping("/products/{productId}")
    public void deleteProduct( @PathVariable int productId ){
        productService.deleteById(productId);
    }

//    @PostMapping( value = "/image", produces = "application/json")
//    UploadImageBean uploadImage(@RequestParam int productId, @RequestParam(value = "file", required = false) MultipartFile file, @RequestParam(required = false) String fileName) throws Exception {
//        return uploadImageService.uploadImage(productId, file, fileName);
//    }

    @PostMapping("/addP")
    public void saveProduct(@RequestParam("file") MultipartFile file,
                              @RequestParam("pname") String name,
                              @RequestParam("description") String description,
                              @RequestParam("price") int price,
                              @RequestParam("quantity") int quantity,
                            @RequestParam("categoryid") int categoryId
                              )
    {
        productService.saveProductToDB(file, name, description, price, quantity, categoryId);

    }

    @PutMapping("/editProduct")
    public void editProduct(@RequestParam("id") int id,
                              @RequestParam("name") String name,
                              @RequestParam("price") int price,
                              @RequestParam("description") String description,
                              @RequestParam("quantity") int quantity,
                              @RequestParam("categoryId") int categoryId){
        productService.editProduct(id, name, price, description, quantity, categoryId );
    }
//    @GetMapping("/download")
//    public void getImage(HttpServletResponse response){
//        Optional<Product> productOptional = productService.findById(15);
//        if( productOptional.isPresent() ) {
//            Product product = productOptional.get();
//            byte[] content = product.getImage();
//            String fileName = "image.png";
//            response.setContentType("image/png");
//            response.addHeader("Content-Disposition", "attachment; filename=\"" + fileName);
//
//            OutputStream out;
//            try {
//                out = response.getOutputStream();
//                out.write(content);
//                out.flush();
//                out.close();
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }
//        }
//    }
}
