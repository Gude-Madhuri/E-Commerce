package com.spring.ecommerce.customDao;

import com.spring.ecommerce.entity.User;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


public class CustomUserDaoImpl implements CustomUserDao {

    private EntityManager entityManager;

    public CustomUserDaoImpl(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }

    @Override
    @Transactional
    public List<User> checkUser( User user) {

        Session session = entityManager.unwrap(Session.class);

        Query<User> theQuery = session.createQuery("select u from User u "
                + "where u.username=:theusername and u.pwd=:thepassword ");
        theQuery.setParameter("theusername", user.getUsername());
        theQuery.setParameter("thepassword", user.getPwd());

        List<User> theUser = theQuery.getResultList();

        return theUser;
    }
}
