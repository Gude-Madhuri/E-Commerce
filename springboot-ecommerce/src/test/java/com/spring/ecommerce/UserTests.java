package com.spring.ecommerce;

import com.spring.ecommerce.dao.UserRepo;
import com.spring.ecommerce.entity.User;
import com.spring.ecommerce.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase( replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class UserTests {

    @Autowired
    private  UserRepo userRepo;

    @Autowired
    private UserService userService;

//    @Test
//    public void createUserTest(){
//        User theUser = new User();
//
//        theUser.setUsername("jkdasfh@gmail.com");
//        theUser.setPwd("123456");
//        theUser.setRole("customer");
//        theUser.setFirstName("Shanvi");
//        theUser.setLastName("Gurram");
//
//        User saveUser = userService.save(theUser);
//        System.out.print(saveUser);
//        Assertions.assertTrue(saveUser.getId()>0);
//    }

    @Test
    public void updateAddressTest(){
        String address = "32-12 Gajuwaka Vizag Andhra Pradesh";
        int id = 3;
        userService.updateAddressByUserId(id,address);
        User theUser = userService.findById(id).get();
        Assertions.assertEquals(address, theUser.getAddress());
    }

    @Test
    public void updateProfileTest(){
        int id = 3;
        String username = "bhanu@gmail.com";
        String password = "1234";
        String firstName = "";
        String lastName = "";
        String phone = "";
        String address ="";
        userService.updateProfile(id, username, password, firstName, lastName, phone, address );

        Optional<User> theuser = userService.findById(id);
        Assertions.assertEquals(username, theuser.get().getUsername());
        Assertions.assertEquals(password, theuser.get().getPwd());
        Assertions.assertEquals(firstName, theuser.get().getFirstName());
        Assertions.assertEquals(lastName, theuser.get().getLastName());
        Assertions.assertEquals(phone, theuser.get().getPhone());
        Assertions.assertEquals(address, theuser.get().getAddress());
    }

    @Test
    public void updateRoleByUserIdTest(){
        int id = 3;
        String role = "admin";
        userService.updateRoleByUserId(id,role);
        User user = userService.findById(id).get();
        Assertions.assertEquals(role, user.getRole());
    }

}
