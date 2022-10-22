package com.spring.ecommerce.dao;

import com.spring.ecommerce.customDao.CustomUserDao;
import com.spring.ecommerce.entity.Cart;
import com.spring.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User,Integer>,CustomUserDao {

    @Modifying
    @Query("update User u set u.address=:address where u.id=:userid")
    public void updateAddressByUserId(@Param("userid") int userid, @Param("address") String address );

    @Modifying
    @Query("update User u set " +
            "u.username=:username, " +
            "u.pwd=:password, " +
            "u.firstName=:firstname, " +
            "u.lastName=:lastname," +
            "u.phone=:phone, " +
            "u.address=:address where u.id=:userid")
    public void updateProfile(@Param("userid") int userid,
                              @Param("username") String username,
                              @Param("password") String password,
                              @Param("firstname") String firstName,
                              @Param("lastname") String lastName,
                              @Param("phone") String phone,
                              @Param("address") String address
        );


    @Modifying
    @Query("update User u set u.role=:role where u.id=:id")
    public void updateRoleByUserId(@Param("id") int id, @Param("role") String role );

}
