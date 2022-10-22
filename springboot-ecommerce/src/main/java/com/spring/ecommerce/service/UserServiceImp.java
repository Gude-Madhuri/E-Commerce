package com.spring.ecommerce.service;

import com.spring.ecommerce.dao.UserRepo;
import com.spring.ecommerce.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImp implements UserService{

    private UserRepo userDAO;

    @Autowired
    public UserServiceImp( UserRepo theUserDAO ){
        userDAO = theUserDAO;
    }

    @Override
    public List<User> findAll() {
        return userDAO.findAll();
    }

    @Override
    public Optional<User> findById(int theId) {
        return userDAO.findById(theId);
    }

    @Override
    public User save(User theUser) {
        return userDAO.save(theUser);
    }

    @Override
    public void deleteById(int theId) {
        userDAO.deleteById(theId);
    }

    @Override
    public List<User> checkUser(User user) {
        return userDAO.checkUser(user);
    }

    @Override

    public void updateAddressByUserId(int userid, String address) {
        userDAO.updateAddressByUserId(userid, address);
    }

    @Override
    public void updateProfile(int userid, String username, String password, String firstName, String lastName, String phone, String address) {
        userDAO.updateProfile(userid, username, password, firstName,lastName, phone, address);
    }

    @Override
    public void updateRoleByUserId(int id, String role) {
        userDAO.updateRoleByUserId(id,role);
    }


}
