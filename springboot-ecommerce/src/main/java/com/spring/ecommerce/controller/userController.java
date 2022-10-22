package com.spring.ecommerce.controller;

import com.spring.ecommerce.entity.User;
import com.spring.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class userController {

    private UserService userService;

    @Autowired
    public userController(UserService theUserService){
        userService = theUserService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.findAll();
    }

    @GetMapping("/users/{userId}")
    public Optional<User> getUserById( @PathVariable int userId ){
        return userService.findById(userId);
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User theUser){
        return userService.save(theUser);
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User theUser){
        return userService.save(theUser);
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUser( @PathVariable int userId ){
        userService.deleteById(userId);
    }

    @PostMapping("/login")
    public List<User> checkUser( @RequestBody User theUser){
        return userService.checkUser(theUser);
    }

    @PutMapping("/updateAddressByUserId")
    public void updateAddressByUserId(@RequestParam int userId, @RequestParam String address){
        userService.updateAddressByUserId(userId, address);
    }

    @PutMapping("/updateProfile")
    public void updateProfile(@RequestParam int userId,
                                      @RequestParam String username,
                              @RequestParam String password,
                              @RequestParam String firstName,
                              @RequestParam String lastName,
                              @RequestParam String phone,
                              @RequestParam String address){
        userService.updateProfile(userId, username, password, firstName, lastName,phone,  address);
    }

    @PutMapping("/updateRoleByUserId")
    public void updateRoleByUserId(@RequestParam int id, @RequestParam String role){
        userService.updateRoleByUserId(id,role);
    }
}
