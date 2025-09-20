package com.finalyear.publicpulse.repo;

import com.finalyear.publicpulse.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    Optional<Object> findUserByEmail(String email);

    Optional<Object> findUserByUsername(String username);
    Users findUsersByUsername(String username);

    Optional<Object> findUserByMobileNo(String mobileNo);
}
