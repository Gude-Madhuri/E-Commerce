package com.spring.ecommerce.service;

import com.spring.ecommerce.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public List<User> findAll();

    public Optional<User> findById(int theId);

    public User save(User theUser);

    public void deleteById(int theId);

    public List<User> checkUser(User user);

    public void updateAddressByUserId(int userid, String address);

    public void updateProfile(int userid, String username, String password, String firstName, String lastName, String phone, String address);

    public void updateRoleByUserId(int id, String role);
}
