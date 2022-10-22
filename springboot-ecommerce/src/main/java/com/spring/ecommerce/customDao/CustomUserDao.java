package com.spring.ecommerce.customDao;

import com.spring.ecommerce.entity.User;

import java.util.List;

public interface CustomUserDao {
    public List<User> checkUser(User user);
}
